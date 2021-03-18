import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Input, Switch } from "antd";

import "./ConfigsList.scss";
import { IconEdit } from "../../icons";

import { SET_CONFIG_COLLECTION } from "../../actions/";

const ConfigsList = () => {
  const [editConfig, setEditConfig] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { configCollection } = useSelector((state) => state.configState);
  const dispatch = useDispatch();

  const editConfigHandle = (config) => {
    setEditConfig(config);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    const newConfigCollection = configCollection.map((item) => {
      return item.item_id === editConfig.item_id
        ? { ...editConfig }
        : { ...item };
    });

    dispatch({ type: SET_CONFIG_COLLECTION, payload: newConfigCollection });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeSwitcher = (value, keyName) => {
    const newEditObject = updateCurrentProperty(editConfig, keyName, value);
    setEditConfig(newEditObject);
  };

  const onChangeInput = ({ target }, keyName, isNumber) => {
    const integer = isNumber ? parseInt(target.value, 10) : target.value;
    const newEditObject = updateCurrentProperty(editConfig, keyName, integer);
    setEditConfig(newEditObject);
  };

  const renderConfigList = () =>
    configCollection.map((config) => (
      <a
        href="#"
        key={config.item_id}
        className="list-group-item list-group-item-action item-config"
      >
        <span>Config {config.item_id}</span>
        <IconEdit onClick={() => editConfigHandle(config)} />
      </a>
    ));

  const isBoolean = (variable) => typeof variable === "boolean";
  const isNumber = (variable) => typeof variable === "number";
  const isString = (variable) => typeof variable === "string";

  const updateCurrentProperty = (
    currentConfig,
    propertyNameToSearch,
    nevValue
  ) => {
    let newFiltersCollection = {};

    Object.keys(currentConfig).forEach((propName) => {
      const newCurrentValue =
        propName === propertyNameToSearch ? nevValue : currentConfig[propName];

      newFiltersCollection = {
        ...newFiltersCollection,
        [propName]: newCurrentValue,
      };
    });

    return newFiltersCollection;
  };

  const renderConfigPropertys = () =>
    Object.keys(editConfig).map((keyName, i) => {
      return (
        <div className="property-item" key={i}>
          {keyName !== "item_id" && (
            <span className="property-item__name">{keyName}</span>
          )}
          {keyName !== "item_id" && isString(editConfig[keyName]) && (
            <span className="property-item__value">
              <Input
                value={editConfig[keyName]}
                onChange={(event) => onChangeInput(event, keyName)}
              />
            </span>
          )}

          {keyName !== "item_id" && isNumber(editConfig[keyName]) && (
            <span className="property-item__value">
              <Input
                value={editConfig[keyName]}
                onChange={(event) => onChangeInput(event, keyName, true)}
              />
            </span>
          )}

          {keyName !== "item_id" && isBoolean(editConfig[keyName]) && (
            <span className="property-item__value">
              <Switch
                checked={editConfig[keyName]}
                onChange={(value) => onChangeSwitcher(value, keyName)}
              />
            </span>
          )}
        </div>
      );
    });

  return (
    <div id="configs-list" className="container">
      <div className="main-box">
        <h3>Config list</h3>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>{renderConfigPropertys()}</div>
        </Modal>
        <div className="list-group">{renderConfigList()}</div>
      </div>
    </div>
  );
};

export default ConfigsList;
