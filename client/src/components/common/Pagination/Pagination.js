import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

class Pagination extends Component {
	render () {
		return (
			<div className="pagination">
				
			</div>
		);
	}
}

Pagination.propTypes = {
	pages: PropTypes.number.isRequired,
	initialPage: PropTypes.number,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;