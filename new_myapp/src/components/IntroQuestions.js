import React from 'react';

class IntroQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'wiki-info-qid'>
        <ul>
          { this.props.intro_questions }
        </ul>
       </div>   
    );
  }
}

export default IntroQuestions;