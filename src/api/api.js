import superagent from 'superagent';

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {
  constructor(opts) {
    this.opts = opts || {};

    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

    methods.forEach(method =>
      this[method] = (path, { params, data, callback } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

        if (params) {
          request.query(params);
        }

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

        if(callback) {
            request.end(function(err, res){
                if(res.ok)
                    callback()
            })
        } else {
            request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
        }

      })
    );
  }
}

const Api = _Api;

export default Api;
