import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { DateTime } from "luxon";


function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value, 
      issue: event.target.issue.value,
      id: v4(),
      timeOpen: new DateTime.now(),
      formattedWaitTime: new DateTime.now().toRelative()
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;




// const NewPostForm = (props) => {
//   const handleAddingNewPostToForum = (e) => {
//     e.preventDefault();
//     props.onNewPostCreation({
//       subject: e.target.postTitle.value,
//       message: e.target.postBody.value,
//       id: v4(),
//     });
//   }