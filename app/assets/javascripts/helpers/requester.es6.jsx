class Requester {

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
       $. ajax($.extend({}, extraFields, {
            url: endpoint,
            type: type,
            data: data,
            success: (msg) => {
                console.log(msg);
                debugger;
                if (msg.message) {
                    toastr.options.positionClass = 'toast-bottom-right';
                    toastr.success(msg.message)
                }
                if (msg.to) {
                    window.location.href = msg.to
                }
                console.log("hello world lolololol");
                onSuccess(msg);
            },
            error: (xhr, status, error) => {
                console.log("This is from the error!!!!");
                console.log(status);
                console.log(error);
                debugger;
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
        console.log("post");
        this._attemptAjax(endpoint, 'POST', data, extraFields, success,
            this._postErrorHandler);
    }

    getJSON(endpoint, success, data = {}) {
        this._attemptAjax(`${endpoint}.json`, 'GET', data,
            { dataType : 'json' }, success, this._getErrorHandler);
    }

    put(endpoint, data, success, extraFields = {}) {
        console.log("put");
        this._attemptAjax(endpoint, 'PUT', data, extraFields, success,
            this._postErrorHandler);
    }

    delete(endpoint, success, data = {}, extraFields = {}) {
        this._attemptAjax(endpoint, 'DELETE', data, extraFields, success,
            this._postErrorHandler);
    }
}

const APIRequester = new Requester();
