from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app) 

# 1. Load the OneHotEncoder
encoder_path = 'random_forest_models/onehot_encoder.joblib'
if not os.path.exists(encoder_path):
    raise FileNotFoundError(f"OneHotEncoder not found at {encoder_path}")
encoder = joblib.load(encoder_path)
print("OneHotEncoder loaded successfully.")

# 2. Load the trained Random Forest models
model_paths = {
    'Methane_Impact': 'random_forest_models/random_forest_Methane_Impact.joblib',
    'EV_Impact': 'random_forest_models/random_forest_EV_Impact.joblib',
    'Renew_Impact': 'random_forest_models/random_forest_Renew_Impact.joblib',
    'Afforestation_Impact': 'random_forest_models/random_forest_Afforestation_Impact.joblib'
}

rf_models = {}
for target, path in model_paths.items():
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model for {target} not found at {path}")
    rf_models[target] = joblib.load(path)
    print(f"Random Forest model for {target} loaded successfully.")

# 3. Define the expected categorical and numerical features
categorical_features = [
    'Mining_Type', 'Mining_Location', 'Vehicle_Type', 'Fuel_Type', 'Explosive_Type',
    'Equipment_Quality_Excavator', 'Equipment_Excavator', 'Equipment_Quality_Bulldozer',
    'Equipment_Bulldozer', 'Equipment_Haul Truck', 'Equipment_Quality_Haul Truck',
    'Equipment_Drill Rig', 'Equipment_Quality_Drill Rig', 'Equipment_Loader',
    'Equipment_Quality_Loader', 'Energy_Source_Bulldozer', 'Energy_Source_Haul Truck',
    'Energy_Source_Drill Rig', 'Energy_Source_Loader'
]

numerical_features = [
    'Hours_Run_Excavator', 'Hours_Run_Bulldozer', 'Hours_Run_Haul Truck',
    'Hours_Run_Drill Rig', 'Hours_Run_Loader', 'Distance_Travelled'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Check if data is provided
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Convert JSON data to DataFrame
        input_df = pd.DataFrame([data])
        
        # Ensure all required features are present
        missing_features = set(categorical_features + numerical_features) - set(input_df.columns)
        if missing_features:
            return jsonify({'error': f'Missing features: {missing_features}'}), 400
        
        # Separate categorical and numerical features
        cat_df = input_df[categorical_features]
        num_df = input_df[numerical_features]
        
        # One-Hot Encode categorical features
        encoded_cat = encoder.transform(cat_df)
        encoded_cat_df = pd.DataFrame(encoded_cat, columns=encoder.get_feature_names_out(categorical_features))
        
        # Combine numerical and encoded categorical features
        processed_features = pd.concat([num_df, encoded_cat_df], axis=1)
        
        # Make predictions for each target
        predictions = {}
        for target, model in rf_models.items():
            pred = model.predict(processed_features)[0]
            predictions[target] = pred
        
        return jsonify(predictions)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
