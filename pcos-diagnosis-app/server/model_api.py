import os
import json
import joblib
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load model and scaler
model_path = os.path.join(current_dir, 'logistic_selected_model.pkl')
scaler_path = os.path.join(current_dir, 'scaler_selected_model.pkl')

print(f"Model path: {model_path}")
print(f"Scaler path: {scaler_path}")
print(f"Model file exists: {os.path.exists(model_path)}")
print(f"Scaler file exists: {os.path.exists(scaler_path)}")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
print("Using scaler for Free Testosterone, DHEAS, FSH")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features - updated to new hormone inputs
        free_testosterone = float(data['free_testosterone'])
        dheas = float(data['dheas'])
        fsh = float(data['fsh'])
        
        # Prepare features
        features = np.array([[free_testosterone, dheas, fsh]])
        
        # Scale features
        scaled_features = scaler.transform(features)
        
        # Get prediction
        prediction = model.predict(scaled_features)[0]
        
        # Get probability
        probability = model.predict_proba(scaled_features)[0]
        
        # Get feature importance (coefficients)
        feature_importance = model.coef_[0].tolist()
        
        # Calculate decision boundary distance
        decision_function = model.decision_function(scaled_features)[0]
        
        # Prepare result
        result = {
            'hasPCOS': bool(prediction),
            'probability': probability.tolist(),
            'riskScore': round(probability[1] * 100),
            'featureImportance': {
                'free_testosterone': feature_importance[0],
                'dheas': feature_importance[1],
                'fsh': feature_importance[2]
            },
            'decisionBoundaryDistance': decision_function
        }
        
        return jsonify(result)
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001) 