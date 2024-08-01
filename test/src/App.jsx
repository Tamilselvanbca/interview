import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SegmentCreator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemaOptions, setSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'Age', value: 'age' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [customSchemaLabel, setCustomSchemaLabel] = useState('');
  const [showCustomSchemaInput, setShowCustomSchemaInput] = useState(false);

  const addNewSchema = (value) => {
    if (value && !selectedSchemas.includes(value)) {
      setSelectedSchemas([...selectedSchemas, value]);
    }
  };

  const handleSchemaChange = (index, value) => {
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = value;
    setSelectedSchemas(newSchemas);
  };

  const removeSchema = (index) => {
    const newSchemas = selectedSchemas.filter((_, i) => i !== index);
    setSelectedSchemas(newSchemas);
  };

  const handleSaveSegment = () => {
    const schemaObject = selectedSchemas.map((schema) => {
      return schemaOptions.find(option => option.value === schema);
    }).filter(Boolean);

    const segmentData = {
      segment_name: segmentName,
      schema: schemaObject.reduce((acc, { label, value }) => {
        acc[value] = label;
        return acc;
      }, {})
    };

    console.log(segmentData);
    setIsSidebarOpen(false); 
  };

  const handleCancel = () => {
    setIsSidebarOpen(false); 
  };

  const handleAddCustomSchema = () => {
    if (customSchemaLabel) {
      const newValue = customSchemaLabel.toLowerCase().replace(/\s+/g, '_');
      setSchemaOptions([...schemaOptions, { label: customSchemaLabel, value: newValue }]);
      setSelectedSchemas([...selectedSchemas, newValue]);
      setCustomSchemaLabel('');
      setShowCustomSchemaInput(false);
    }
  };

  return (
    <div className="container-fluid p-0 bg-secondary vh-100">
      <h4 className='bg-info p-2 '>View Audience</h4>
      <button
        className="btn btn-secondary border border-white m-4  "
        onClick={() => setIsSidebarOpen(true)}
      >
        Save Segment
      </button>

      {isSidebarOpen && (
        <div className=" position-fixed top-0 end-0 bg-light border  " style={{ width: '100%', maxWidth: '700px', height: '100vh', overflowY: 'auto' }}>
          <div className='d-flex flex-column flex-sm-row gap-2 bg-info'>
            <button
            className="btn-close mt-2 "
            onClick={() => setIsSidebarOpen(false)}
          ></button>

          <h4 className="m-2 ">Saving Segment</h4>
          </div>
          <div className="m-3">
            <label htmlFor="segmentName" className="form-label"><strong>Enter the name of the Segment</strong></label>
            <input
              type="text"
              id="segmentName"
              placeholder='Name of the segment'
              className="form-control"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
<p className='m-3'><strong>To save your segment, you need to add the schemas to build the query</strong></p>
         <div className='border border-3 border-primary  m-3'>
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="m-3 d-flex flex-column flex-sm-row align-items-center ">
              <select
                className="form-select me-sm-2 mb-2 mb-sm-0"
                value={schema}
                onChange={(e) => handleSchemaChange(index, e.target.value)}
              >
                <option value="">Select Schema</option>
                {schemaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => removeSchema(index)}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
            
          ))}
</div>
          <div className="mb-3 p-3">
            <select
              id="schemaDropdown"
              className="form-select "
              onChange={(e) => addNewSchema(e.target.value)}
            >
              <option value="">Add schema to segment</option>
              {schemaOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5 p-3 ">
            <button
              className="btn text-success text-decoration-underline mb-5"
              onClick={() => setShowCustomSchemaInput(true)}
            >
              +Add new Schema
            </button>

            {showCustomSchemaInput && (
              <div className="mb-3">
                <label htmlFor="customSchemaLabel" className="form-label">Custom Schema Label</label>
                <input
                  type="text"
                  id="customSchemaLabel"
                  className="form-control"
                  value={customSchemaLabel}
                  onChange={(e) => setCustomSchemaLabel(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddCustomSchema}
                >
                  Add Custom Schema
                </button>
                <button
                  className="btn btn-secondary mt-2 ms-2"
                  onClick={() => setShowCustomSchemaInput(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 bg-secondary p-3">
            <button
              className="btn btn-success"
              onClick={handleSaveSegment}
            >
              Save Segment
            </button>
            <button
              className="btn bg-white text-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentCreator;
