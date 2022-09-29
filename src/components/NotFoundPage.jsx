import React, { PureComponent } from 'react';

export default class NullPage extends PureComponent {
  render() {
    return (
      <div className="not-found-page">
        <div className="not-found-page-title">Page not found</div>;
      </div>
    );
  }
}
