import React, {Component} from 'react';
import { Picker } from 'react-native';

export default class Item_picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue == undefined ? this.props.values[0] : this.props.selectedValue,
      pickerItems: this.props.values,
    }
  }

  render() {
    return (
      <Picker
        style={this.props.style}
        selectedValue={this.state.selectedValue}
        onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedValue: itemValue});
            if(this.props.onChange != undefined) {
              this.props.onChange(itemValue);
            }
          }
        }
      >
        {this.state.pickerItems.map((item, index) => {
           return this.props.labels == undefined ? <Picker.Item label={item} value={item} key={index}/> : <Picker.Item label={this.props.labels[index]} value={item} key={index}/>
        })}
      </Picker>
    );
  }
};
