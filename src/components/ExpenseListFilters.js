import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filterActions';
import { DateRangePicker } from 'react-dates';

// Presentational component that allows us to set the text filter from the UI.
// The new text filter is written to the store
export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
    // console.log(e.target.value)
  }

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    }
    else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group__item">
          <input 
            className="input"
            id="input--searchbox"
            onChange={this.onTextChange} 
            placeholder="Search expenses"
            type="text" 
            value={this.props.filters.text} 
          />
        </div>
        <div className="input-group__item">
          <select 
            className="select"
            onChange={this.onSortChange}
            value={this.props.filters.sortBy} 
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="input-group__item--date-picker">
          <DateRangePicker 
            endDate={this.props.filters.endDate} 
            endDateId="end_date" 
            focusedInput={this.state.calendarFocused} 
            isOutsideRange={() => false} 
            numberOfMonths={1} 
            onDatesChange={this.onDatesChange} 
            onFocusChange={this.onFocusChange} 
            showClearDates={true}
            startDate={this.props.filters.startDate} 
            startDateId="start_date" 
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (date) => dispatch(setStartDate(date)),
  setEndDate: (date) => dispatch(setEndDate(date)),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});

const mapStateToProps = (state) => ({ filters: state.filters });

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);