export class LoadingState {
  state: Loading = Loading.Loading;
  message: string = "";

  setLoading() {
    return this.state = Loading.Loading;
  }

  isLoading(): boolean {
    return this.state == Loading.Loading;
  }

  setSuccessful() {
    this.state = Loading.Successful;
  }

  hasSucceeded(): boolean {
    return this.state == Loading.Successful;
  }

  setFailed(message?:string) {
    this.state = Loading.Failed;
    this.message = message;
  }

  hasFailed(): boolean {
    return this.state == Loading.Failed;
  }
}

enum Loading {
  Loading,
  Successful,
  Failed
}
