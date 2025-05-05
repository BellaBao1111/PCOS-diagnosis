import sys
import json
import joblib
import numpy as np
import os

def predict():
    try:
        print("Python script started", file=sys.stderr)
        
        # Parse input json from stdin
        if len(sys.argv) < 2:
            raise ValueError("No input data provided")
        
        input_data = json.loads(sys.argv[1])
        print(f"Input data: {input_data}", file=sys.stderr)
        
        # Extract features - updated to new hormone inputs
        free_testosterone = float(input_data['free_testosterone'])
        dheas = float(input_data['dheas'])
        fsh = float(input_data['fsh'])
        
        # Get the current directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(f"Current directory: {current_dir}", file=sys.stderr)
        
        # Check if model files exist
        model_path = os.path.join(current_dir, 'logistic_selected_model.pkl')
        scaler_path = os.path.join(current_dir, 'scaler_selected_model.pkl')
        
        print(f"Model path: {model_path}", file=sys.stderr)
        print(f"Scaler path: {scaler_path}", file=sys.stderr)
        print(f"Model file exists: {os.path.exists(model_path)}", file=sys.stderr)
        print(f"Scaler file exists: {os.path.exists(scaler_path)}", file=sys.stderr)
        
        # Load model and scaler
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        # Prepare features
        features = np.array([[free_testosterone, dheas, fsh]])
        print(f"Features: {features}", file=sys.stderr)
        
        # Scale features
        scaled_features = scaler.transform(features)
        print(f"Scaled features: {scaled_features}", file=sys.stderr)
        
        # Get prediction
        prediction = model.predict(scaled_features)[0]
        print(f"Prediction: {prediction}", file=sys.stderr)
        
        # Get probability
        probability = model.predict_proba(scaled_features)[0]
        print(f"Probability: {probability}", file=sys.stderr)
        
        # Get feature importance (coefficients)
        feature_importance = model.coef_[0].tolist()
        print(f"Feature importance: {feature_importance}", file=sys.stderr)
        
        # Calculate decision boundary distance
        # This gives a sense of confidence in the classification
        decision_function = model.decision_function(scaled_features)[0]
        print(f"Decision function: {decision_function}", file=sys.stderr)
        
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
        
        # Return result as JSON
        print(json.dumps(result))
        print("Python script completed successfully", file=sys.stderr)
        
    except Exception as e:
        import traceback
        print(f"Error in Python script: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        print(json.dumps({
            'error': str(e)
        }))

if __name__ == "__main__":
    predict() 