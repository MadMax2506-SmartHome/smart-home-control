import React, {Component} from 'react';
import { Picker } from 'react-native';

export default class Item_picker extends Component {
  constructor(props) {
    super(props);

    const selectedValue = this.props.selectedValue == undefined ? this.props.values[0] : this.props.selectedValue
    this.state = {
      selectedValue: selectedValue,
      pickerItems: this.props.values,
    }
  }

  render() {
    return (
      <Picker
        style = {this.props.style}
        selectedValue = {this.state.selectedValue}
        onValueChange = {(itemValue, itemIndex) => {
            this.setState({selectedValue: itemValue});
            if(this.props.onChange != undefined) {
              this.props.onChange(itemValue);
            }
          }
        }
      >
        {this.state.pickerItems.map((item, index) => {
          if(this.props.labels == undefined) {
            return (<Picker.Item label={item} value={item} key={index}/>)
          } else {
            return (<Picker.Item label={this.props.labels[index]} value={item} key={index}/>)
          }
        })}
      </Picker>
    );
  }
};
