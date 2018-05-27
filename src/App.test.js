import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './enzyme';
import { withState } from './App';
import { shallow } from 'enzyme';
import { constants } from 'perf_hooks';
import renderer from 'react-test-renderer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Arrange
const BaseButton = ({ name }) => (<button>Hello {name}!</button>);
const ButtonWithState = withState(BaseButton);

describe('wrap a component', () => {
  let theButton;

  beforeEach(() => {
    // Act
    theButton = shallow(<ButtonWithState name={"John"} />);
  });

  // Assert
  it('should contain a `bool` property in the state', () => {
    expect(theButton.state()).toEqual({ "bool": true });
  });

  it('should pass base components props forward', () => {
    expect(theButton.props().name).toEqual("John");
  });
  
  it('should render the same thing as the base component', () => {
    const baseComponent = shallow(<BaseButton name={"John"} />);
    expect(baseComponent.html()).toEqual(theButton.html());
  });

  describe('.. after toggle', () => {
    beforeEach(() => {
      // Act
      // Code review - consider renaming toggle to onToggle, so you can use simulate here, which would fit better
      // theButton.simulate('toggle');
      theButton.props().toggle();
    });


    it('should change the value of bool to false', () => {
      expect(theButton.state()).toEqual({ "bool": false });
    });
  })
});

describe('App', () => {
  it('snapshot when true', () => {
    const app = renderer.create(<App bool={true} classes={{something: "someClass" }} />).toJSON();
    expect(app).toMatchSnapshot();
  });

  it('snapshot when false', () => {
    const app = renderer.create(<App bool={false} classes={{something: "someClass" }} />).toJSON();
    expect(app).toMatchSnapshot();
  });


  let wrapper, mock;

  beforeEach(() => {
    mock = jest.fn();
    wrapper = shallow(<App bool={false} toggle={mock} classes={{something: "someClass" }}/>);
  });

  it('should display the value of `bool`', () => {
    expect(wrapper.find(Typography).childAt(1).text()).toEqual("false");
  });

  it('should call `toggle` when button is clicked', () => {
    const button = wrapper.find(Button);
    button.simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});