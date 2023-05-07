type DoneCallback = () => void;
type ProvidesCallback = ((cb: DoneCallback) => void | undefined) | (() => Promise<unknown>);
