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
  const [loading, setLoading] = useState(false);

  // 🔗 Replace with your own webhook URL from https://webhook.site/
  const WEBHOOK_URL = "https://webhook.site/your-webhook-url-here";

  const resetPopup = () => {
    setSegmentName("");
    setSelectedSchemas([]);
    setTempSchema("");
    setShowPopup(false);
    setLoading(false);
  };

  const handleAddSchema = () => {
    if (!tempSchema) return;
    const selectedOption = schemaOptions.find((o) => o.value === tempSchema);
    setSelectedSchemas([...selectedSchemas, selectedOption]);
    setTempSchema("");
  };

  const handleSchemaChange = (index, value) => {
    const updatedSchemas = [...selectedSchemas];
    const newOption = schemaOptions.find((o) => o.value === value);
    updatedSchemas[index] = newOption;
    setSelectedSchemas(updatedSchemas);
  };

  const handleSaveSegment = async () => {
    const schemaData = selectedSchemas.map((s) => ({ [s.value]: s.label }));
    const dataToSend = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log("Sending to server:", dataToSend);
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("✅ Segment saved and data sent successfully!");
      } else {
        alert("❌ Failed to send data to server!");
      }
    } catch (error) {
      alert("⚠️ Error sending data: " + error.message);
    }

    resetPopup();
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

            <div className="actions">
              <button
                className="save"
                onClick={handleSaveSegment}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save the Segment"}
              </button>
              <button className="cancel" onClick={resetPopup} disabled={loading}>
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
