import React, {Component} from 'react';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      notTyping: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value, notTyping: false});
  }

  handleSubmit(event) {
    if (!this.state.searchValue.trim()) {
      this.setState({searchValue: "", notTyping: true });
      event.preventDefault();
      return;
    } 
    this.props.addStock(this.state.searchValue, "search");
    this.setState({searchValue: "", notTyping: true });
    event.preventDefault();
  }

  render() {
    let {
      name,
      notFound
    } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input value={this.state.searchValue} onChange={this.handleChange} type="text" name="filterterm" className="form-control"/>
              <span className="input-group-btn">
                <button type="submit" className="btn btn-info ">Add</button>
              </span>
            </div>
          </form>
          { notFound && this.state.notTyping &&
            <p id="notFound" className="text-danger">Please enter a valid stock symbol</p>
          }
        </div>
      </div>
    );
  }
}

export default SearchPanel;
