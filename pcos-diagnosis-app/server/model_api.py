import os
import json
import joblib
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load model and scaler
model_path = os.path.join(current_dir, 'pcos_model3.pkl')
scaler_path = os.path.join(current_dir, 'pcos_scaler3.pkl')

print(f"Model path: {model_path}")
print(f"Scaler path: {scaler_path}")
print(f"Model file exists: {os.path.exists(model_path)}")
print(f"Scaler file exists: {os.path.exists(scaler_path)}")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features
        epitestosterone = float(data['epitestosterone'])
        insulin = float(data['insulin'])
        androstanolone = float(data['androstanolone'])
        
        # Prepare features
        features = np.array([[epitestosterone, insulin, androstanolone]])
        
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
                'epitestosterone': feature_importance[0],
                'insulin': feature_importance[1],
                'androstanolone': feature_importance[2]
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