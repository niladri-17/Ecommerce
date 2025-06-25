import errors from './errors'

class Http {
  private _methods: object = {}
  private _errors: typeof errors

  constructor() {
    this._errors = errors as typeof errors
  }

  get errors() {
    return this._errors
  }
}

export default new Http()
