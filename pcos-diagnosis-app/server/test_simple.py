import os
import joblib
import sys
import numpy as np

print("Python version:", sys.version)
print("Working directory:", os.getcwd())

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
print("Script directory:", current_dir)

try:
    # Try to load the model
    model_path = os.path.join(current_dir, 'logistic_selected_model.pkl')
    print(f"Loading model from: {model_path}")
    model = joblib.load(model_path)
    print("Model loaded successfully")
    print(f"Model type: {type(model).__name__}")
except Exception as e:
    print(f"Error loading model: {str(e)}")

try:
    # Try to load the scaler
    scaler_path = os.path.join(current_dir, 'scaler_selected_model.pkl')
    print(f"\nLoading scaler from: {scaler_path}")
    scaler = joblib.load(scaler_path)
    print("Scaler loaded successfully")
    print(f"Scaler type: {type(scaler).__name__}")
except Exception as e:
    print(f"Error loading scaler: {str(e)}")

print("\nTest complete") 