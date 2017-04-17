class Requester {
  initialize(type, route, content='application/json') {
    const request = new XMLHttpRequest();
    request.open(type, route);
    request.setRequestHeader('Accept', content);
    request.setRequestHeader('Content-Type', content);
    request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    return request;
  }

  _postErrorHandler(xhr, status, error) {
   JSON.parse(xhr.responseText).errors.forEach((error) => {
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error(error);
    });
  }

  _getErrorHandler(xhr, status, error) {
    console.error(xhr, status, error.toString());
  }

  _attemptAjax(endpoint, type, data, extraFields, onSuccess, onError) {
    $.ajax($.extend({}, extraFields, {
      url: endpoint,
      type: type,
      data: data,
      success: (msg) => {
        if (msg.message) {
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.success(msg.message)
        }
        if (msg.to) {
          window.location.href = msg.to
        }
        onSuccess(msg);
      },
      error: (xhr, status, error) => {
        if (xhr.responseJSON) {
          onError(xhr, status, error);
        } else {
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.error(xhr.responseText);
        }
      }
    }));
  }

  post(endpoint, data, success, extraFields = {}) {
    this._attemptAjax(endpoint, 'POST', data, extraFields, success,
        this._postErrorHandler);
  }

  get(route, resolve, reject, extraParams = false, params = {}) {
    const request = this.initialize('GET', route);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 && resolve) {
          if (extraParams) {
            resolve(JSON.parse(request.response), params);
          } else {
            resolve(JSON.parse(request.response));
          }
        } else if (reject) {
          reject(JSON.parse(request.response));
        }
      }
    }
    request.send();
  }

  getJSON(endpoint, success, data = {}) {
    this._attemptAjax(endpoint, 'GET', data,
        { dataType : 'json' }, success, this._getErrorHandler);
  }

  put(endpoint, data, success, extraFields = {}) {
    this._attemptAjax(endpoint, 'PUT', data, extraFields, success,
        this._postErrorHandler);
  }

  delete(endpoint, data = {}, success, extraFields = {}) {
    this._attemptAjax(endpoint, 'DELETE', data, extraFields, success,
        this._postErrorHandler);
  }
}

const APIRequester = new Requester();
