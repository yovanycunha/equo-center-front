import { ChangeEvent, FC, useCallback, useState } from "react";
import scss from "./Select.module.scss";

enum EKeyCodes {
  ENTER = 13,
  ESCAPE = 27,
}

const Select: FC<any> = (props) => {
  const labelClass = [scss.label];
  const legendClass = [scss.legend];
  const fieldsetClass = [scss.fieldset];
  const containerClass = [scss.container];
  const listItemsClass = [scss.listItems];
  const inputFilterClass = [scss.inputFilter];
  const legendTitleClass = [scss.legendTitle];
  const selectWrapperClass = [scss.selectWrapper];
  const listItemsWrapperClass = [scss.listItemsWrapper];
  const selectedOptionClass = [scss.selectedOption];

  const [isFocused, setIsFocused] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const handleBlurTrigger = () => {
    if (props.onBlur) props.onBlur();

    setIsFocused(false);
  };

  const handleKeyUp = useCallback((e: { keyCode: EKeyCodes }) => {
    if (e.keyCode === EKeyCodes.ENTER || e.keyCode === EKeyCodes.ESCAPE) {
      setIsFocused(false);
    }
  }, []);

  const handleOptionKeyUp = useCallback(
    (e: { keyCode: EKeyCodes }, value: any) => {
      if (e.keyCode === EKeyCodes.ENTER || e.keyCode === EKeyCodes.ESCAPE) {
        setIsFocused(false);
        props.onChange(value);
      }
    },
    [props]
  );

  const getSelectFilterPlaceholder = () => {
    let placeholder = props.label;
    const selectedValue = props.children.find(
      (child: JSX.Element) => child.props.selected
    );

    if (props.placeholderFilter && isFocused)
      placeholder = props.placeholderFilter;

    if (selectedValue) placeholder = "";

    return placeholder;
  };

  const handleFocusTrigger = () => {
    if (props.onFocus) props.onFocus();

    setIsFocused(true);
  };

  const renderErrorMessage = () => (
    <div className={scss.errorWrapper}>
      {/* <AlertIcon className={scss.icon} /> */}
      <span className={scss.errorMessage}>{props.errorMessage}</span>
    </div>
  );

  console.log(props, "props");

  const onChangeFilterValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    if (props.onChangeFilterValue) props.onChangeFilterValue(e.target.value);
  };

  const renderFilter = () => (
    <div className={scss.inputFilterWrapper}>
      <input
        type="text"
        placeholder={getSelectFilterPlaceholder()}
        className={inputFilterClass.join(" ")}
        value={filterValue}
        onChange={onChangeFilterValue}
      />
      {/* <SearchSVG className={scss.searchIcon} /> */}
    </div>
  );

  const renderSelectedOption = () => {
    const selectedValue = props.children.find(
      (child: JSX.Element) => child.props.selected
    );
    let option = selectedValue?.props.children;

    if (selectedValue?.props.label) option = selectedValue?.props.label;

    return (
      <div className={selectedOptionClass.join(" ")}>
        <span>{option}</span>
      </div>
    );
  };

  const renderOptionList = () =>
    props.children.map((child: JSX.Element) => (
      <div
        key={`${child.props.value}`}
        tabIndex={0}
        role="button"
        onClick={() => {
          props.onChange(child.props.value);
        }}
        onKeyUp={(e) => handleOptionKeyUp(e, props.value)}
      >
        {child}
      </div>
    ));

  const renderLabel = () => (
    <label htmlFor="select" className={labelClass.join(" ")}>
      {props.label}
    </label>
  );

  if (isFocused) inputFilterClass.push(scss.visible);
  if (props.theme) containerClass.push(scss[props.theme]);
  if (props.biggerOptions) listItemsClass.push(scss.bigger);
  if (isFocused) listItemsWrapperClass.push(scss.listItemsWrapperVisible);
  if (props.label) legendTitleClass.push(scss.legendPadding);
  if (props.borderless) fieldsetClass.push(scss.borderless);
  if (props.borderBottomOnly) selectWrapperClass.push(scss.borderBottom);
  //   if (!isUndefined(props.errors)) containerClass.push(scss.errorHeight);

  if (
    (isFocused || props.value) &&
    !props.borderless &&
    !props.borderBottomOnly
  ) {
    fieldsetClass.push(scss.fieldsetFocus);
    legendClass.push(scss.legendFocus);

    containerClass.push(scss.containerFocus);
  }

  if (isFocused || props.value) labelClass.push(scss.labelAnimate);

  if (
    !props.errors &&
    props.value !== "" &&
    !isFocused &&
    !props.borderless &&
    !props.borderBottomOnly
  ) {
    fieldsetClass.push(scss.fieldsetFilled);
    legendClass.push(scss.legendFilled);
    labelClass.push(scss.labelFilled);
    containerClass.push(scss.containerFilled);
  }

  if (props.errors && !props.borderless && !props.borderBottomOnly) {
    fieldsetClass.push(scss.fieldsetError);
    containerClass.push(scss.containerError);
    labelClass.push(scss.labelError);
  }

  if (props.darkTheme) {
    fieldsetClass.push(scss.darkTheme);
    labelClass.push(scss.darkTheme);
    selectedOptionClass.push(scss.darkTheme);
    listItemsClass.push(scss.darkTheme);
  }

  if (props.className) containerClass.push(props.className);

  console.log(props.value, "value");

  return (
    <div role="listbox" className={containerClass.join(" ")}>
      <div
        role="button"
        className={selectWrapperClass.join(" ")}
        tabIndex={0}
        onBlur={handleBlurTrigger}
        onFocus={handleFocusTrigger}
      >
        {renderSelectedOption()}
        {props.hasFilter ? renderFilter() : renderLabel()}
        <div
          role="button"
          tabIndex={0}
          className={listItemsWrapperClass.join(" ")}
          onClick={() => setIsFocused(false)}
          onKeyUp={handleKeyUp}
        >
          <div className={listItemsClass.join(" ")} id="listContainer">
            {renderOptionList()}
          </div>
        </div>
        <fieldset aria-hidden="true" className={fieldsetClass.join(" ")}>
          <legend className={legendClass.join(" ")}>
            <span className={legendTitleClass.join(" ")}>{props.label}</span>
          </legend>
        </fieldset>
        {props.arrow && <span className={scss.arrow} />}
      </div>
      {props.errors && renderErrorMessage()}
    </div>
  );
};

export default Select;
