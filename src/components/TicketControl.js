import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as actions from './../actions';


// It should be clear where we will need to dispatch Redux actions - the exact same place where we previously used setState() to change our form's visibility. When refactoring an application to use Redux instead of React for state, this can be a very helpful way to see where the refactor needs to happen. We don't necessarily need to create new methods in our components. We just need to rewire the relevant methods to use Redux instead of React for state.



class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,   
      selectedTicket: null,
      editing: false
    };
  }
  componentDidMount() {
    this.waitTimeUpdateElapsedWaitTime = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.toRelative();
      const action = actions.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = actions.toggleForm();
      dispatch(action);
    }
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;          
    const action = action.deleteTicket(id);
    dispatch(action);                          
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {     
    
    const { dispatch } = this.props;
    const action = actions.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
        editing: false,
        selectedTicket: null
      });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;                       
    const action = actions.addTicket(newTicket);
    dispatch(action);    
    const action2 = actions.toggleForm();            
    dispatch(action2);
  }


  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

  if (this.state.editing) {
    currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
    buttonText = "Return to Ticket List";

  } else if (this.state.selectedTicket != null){
      currentlyVisibleState = <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket}
        onClickingEdit = {this.handleEditClick} />
      buttonText= "Return to Ticket List";

    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List";

    } else {                                       
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
      buttonText = "Add Ticket";
    };

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {/* <button className="btn btn-primary" onClick = {this.handleClick}>{buttonText}</button> */}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
