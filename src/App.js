import React, { useState } from "react";
import "./App.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [tempSchema, setTempSchema] = useState("");

  // Function to reset all popup data
  const resetPopup = () => {
    setSegmentName("");
    setSelectedSchemas([]);
    setTempSchema("");
    setShowPopup(false);
  };

  // Add new schema dropdown
  const handleAddSchema = () => {
    if (!tempSchema) return;
    const selectedOption = schemaOptions.find((o) => o.value === tempSchema);
    setSelectedSchemas([...selectedSchemas, selectedOption]);
    setTempSchema("");
  };

  // Change existing dropdown inside blue box
  const handleSchemaChange = (index, value) => {
    const updatedSchemas = [...selectedSchemas];
    const newOption = schemaOptions.find((o) => o.value === value);
    updatedSchemas[index] = newOption;
    setSelectedSchemas(updatedSchemas);
  };

  // Save segment and reset popup
  const handleSaveSegment = () => {
    const schemaData = selectedSchemas.map((s) => ({ [s.value]: s.label }));
    const dataToSend = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log("Data to send:", dataToSend);
    alert("Segment saved! Check console for data.");
    resetPopup(); // Reset everything after saving
  };

  const availableOptions = schemaOptions.filter(
    (option) => !selectedSchemas.some((s) => s.value === option.value)
  );

  return (
    <div className="App">
      <button className="save-btn" onClick={() => setShowPopup(true)}>
        Save segment
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Saving Segment</h2>
            <label>Enter the Name of the Segment</label>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />

            <p>Add schemas to build the query:</p>

            {/* Blue box */}
            <div className="blue-box">
              {selectedSchemas.map((schema, index) => (
                <select
                  key={index}
                  value={schema.value}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                >
                  {schemaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            {/* Dropdown to add new schema */}
            <div className="add-schema">
              <select
                value={tempSchema}
                onChange={(e) => setTempSchema(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="add-link" onClick={handleAddSchema}>
                + Add new schema
              </span>
            </div>

            {/* Action buttons */}
            <div className="actions">
              <button className="save" onClick={handleSaveSegment}>
                Save the Segment
              </button>
              <button className="cancel" onClick={resetPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
