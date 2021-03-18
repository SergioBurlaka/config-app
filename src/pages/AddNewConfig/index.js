import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Radio, Input, Button, Switch } from "antd";

import "./AddNewConfig.scss";
import { IconPlus } from "../../icons";
import { SET_CONFIG_COLLECTION } from "../../actions/";

const PersonsList = () => {
  const [radioValue, setRadioValue] = useState("boolean");
  const [currentPropertyName, setCurrentPropertyName] = useState("");
  const [currentPropertyValue, setCurrentPropertyValue] = useState("");
  const [currentBooleanValue, setCurrentBooleanValue] = useState(false);
  const [newConfig, setNewConfig] = useState({});
  const dispatch = useDispatch();
  const { configCollection } = useSelector((state) => state.configState);

  const onCreateConfig = () => {
    dispatch({
      type: SET_CONFIG_COLLECTION,
      payload: [...configCollection, ...[{ ...newConfig, item_id: Date.now() }]],
    });

    setNewConfig({});
  };

  const checkIsObjectEmpty = () => {
    const collectionToCheck = Object.keys(newConfig).map((keyName) => keyName);
    return collectionToCheck.length;
  };

  const addPropertyHandler = () => {
    if (!canAddProperty()) {
      return;
    }
    const newCurrentConfig = { ...newConfig };

    let newConfigPropertyValue = currentPropertyValue;

    if (radioValue === "boolean") {
      newConfigPropertyValue = currentBooleanValue;
    }

    if (radioValue === "number") {
      newConfigPropertyValue = parseInt(currentPropertyValue, 10);
    }

    newCurrentConfig[currentPropertyName] = newConfigPropertyValue;
    setNewConfig(newCurrentConfig);
  };

  const canAddProperty = () => {
    if (radioValue === "number" || radioValue === "string") {
      return currentPropertyName.length && currentPropertyValue.length;
    }

    if (radioValue === "boolean") {
      return currentPropertyName.length;
    }
  };

  const renderNewConfigPropertys = () =>
    Object.keys(newConfig).map((keyName, i) => (
      <div key={i} className="new-config__item">
        <span className="new-config__item-name">{keyName}: </span>
        <span className="new-config__item-value">
          {"" + newConfig[keyName]}
        </span>
      </div>
    ));

  return (
    <div id="add-new-config" className="container">
      <div className="main-box">
        <div className="inner-wrapper">
          <div className="inner-wrapper__body">
            <h3>Creatae new config</h3>
            <div className="radio-line">
              <span className="radio-title"> select type of value</span>
              <Radio.Group
                onChange={({ target }) => setRadioValue(target.value)}
                value={radioValue}
              >
                <Radio value={"number"}>Number</Radio>
                <Radio value={"string"}>String</Radio>
                <Radio value={"boolean"}>Boolean</Radio>
              </Radio.Group>
            </div>
            <div className="input-wrapper">
              <div className="input-box">
                <div className="input-label"> Add new config property name</div>
                <Input
                  value={currentPropertyName}
                  placeholder="Input config name"
                  onChange={({ target }) =>
                    setCurrentPropertyName(target.value)
                  }
                />
              </div>
              <div className="input-box">
                <div className="input-label"> Add config property value</div>
                {radioValue !== "boolean" && (
                  <Input
                    value={currentPropertyValue}
                    placeholder="Input config value"
                    onChange={({ target }) =>
                      setCurrentPropertyValue(target.value)
                    }
                  />
                )}

                {radioValue === "boolean" && (
                  <div className="value-switcher-wrapper">
                    <Switch
                      checked={currentBooleanValue}
                      onChange={(value) => setCurrentBooleanValue(value)}
                    />
                  </div>
                )}
              </div>
              <div className="add-btn-wrapper">
                <div
                  className={`add-property-button ${
                    canAddProperty() ? "" : "disabled"
                  }`}
                  onClick={addPropertyHandler}
                >
                  <IconPlus />
                </div>
              </div>
            </div>
            {checkIsObjectEmpty() ? (
              <div className="new-config">
                <h4>New Config</h4>
                <div className="new-config__list">
                  {renderNewConfigPropertys()}
                </div>
              </div>
            ) : null}
          </div>
          <div className="inner-wrapper__footer">
            <div className="button-section">
              <Button
                type="primary"
                onClick={onCreateConfig}
                disabled={!checkIsObjectEmpty()}
              >
                Create config
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonsList;
