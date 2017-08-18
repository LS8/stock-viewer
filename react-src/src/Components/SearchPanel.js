import React, {Component} from 'react';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event) {
    this.props.addStock(this.state.searchValue, "search");
    this.setState({searchValue: ""});
    event.preventDefault();
  }
  

  render() {
    let {
      name,
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
          <p id="notFound">Not found</p>
        </div>
      </div>
    );
  }
}

export default SearchPanel;
