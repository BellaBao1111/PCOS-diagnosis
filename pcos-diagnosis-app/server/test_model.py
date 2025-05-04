import joblib
import numpy as np
import os

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Current directory: {current_dir}")

# Check if model files exist
model_path = os.path.join(current_dir, 'pcos_model3.pkl')
scaler_path = os.path.join(current_dir, 'pcos_scaler3.pkl')

print(f"Model path: {model_path}")
print(f"Scaler path: {scaler_path}")
print(f"Model file exists: {os.path.exists(model_path)}")
print(f"Scaler file exists: {os.path.exists(scaler_path)}")

# Test values
epitestosterone = 6.0
insulin = 25.0
androstanolone = 3.5

try:
    # Load model and scaler
    print("Loading model...")
    model = joblib.load(model_path)
    print("Loading scaler...")
    scaler = joblib.load(scaler_path)
    
    # Prepare features
    features = np.array([[epitestosterone, insulin, androstanolone]])
    print(f"Features: {features}")
    
    # Scale features
    scaled_features = scaler.transform(features)
    print(f"Scaled features: {scaled_features}")
    
    # Get prediction
    prediction = model.predict(scaled_features)[0]
    print(f"Prediction: {prediction}")
    
    # Get probability
    probability = model.predict_proba(scaled_features)[0]
    print(f"Probability: {probability}")
    
    # Get feature importance (coefficients)
    feature_importance = model.coef_[0].tolist()
    print(f"Feature importance: {feature_importance}")
    
    # Calculate decision boundary distance
    decision_function = model.decision_function(scaled_features)[0]
    print(f"Decision function: {decision_function}")
    
    print("Test completed successfully")
    
except Exception as e:
    import traceback
    print(f"Error: {str(e)}")
    print(traceback.format_exc()) 