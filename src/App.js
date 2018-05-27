import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Higher-Order Component
export const withState = (Wrapped) => {
  return class extends Component {
    state = { bool: true }
    toggle = () => this.setState({bool: !this.state.bool});
    render(){
      return <Wrapped bool={this.state.bool} toggle={this.toggle} {...this.props} />
    }
  }
}

// Dumb component
export const App = ({classes, bool, toggle}) => {
  return (
    <div className={classes.something}>
      <Typography className={classes.anotherThing}>Boolean value is: {bool ? 'true' : 'false'}</Typography>
      <Button className={classes.button} onClick={toggle}>Change boolean</Button>
    </div>
  )
}

// styles for CSS in JS
const styles = theme => ({
  something: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  button: {
    width: "100%",
    color: "blue"
  }  
});

// Creating final container with styles and state
const StyledComponent = withStyles(styles, {withTheme: true})(App);
const Container = withState(StyledComponent);
export default Container;
