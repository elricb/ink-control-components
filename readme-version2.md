Ink Control Components

Maybe not NodeScynchronous and instead of callback, use promises.
```
<InkPromiseSynchronous suspense={<Loader />} resolve={<Checkmark />}>
  {/* child promise component */}
  <InkPromise promise={Promise.resolve()} resolve={() => setDone(true)} reject={error => setError(error)} />

  {/* without callbacks, just run the command */}
  <NodeFs module="chmod" args={["myfile.txt", "754"]} />

  {/* callback functions after completion of command */}
  <NodeFs module="chown" args={["myfile.txt", 33, 33]} resolve={() => {}} reject={() => {}} />

  {/* on success, jsx children are shown */}
  <NodeFs module="copyFile" args={["myfile.txt", "myfile2.txt"]}>
    <Text>myfile.txt copied to myfile2.txt</Text>
  </NodeFs>

  {/* on success, if children is a function, return results as args */}
  <NodeFs module="lstat" args={["myfile.txt"]}>
    {(lstat) => <Text>{`modified: ${lstat.mtime}`}</Text>}
  </NodeFs>

  {/* if catch isn't specified, ErrorBoundry can catch thrown errors */}
  <FatalErrorBoundary reject={<Text>{`Directory not created`}</Text>}>
    <NodeFs module="mkdir" args={["mydir"]}>
      <Text>{`Directory created.`}</Text>
    </NodeFs>
  </FatalErrorBoundary>

  {/* while processing, suspense captures display */}
  <InkPromoseSynchronous suspense={<Loading />}>
    <NodeFs module="writeFile" args={["myfile.txt", "my file contents."]} />
  </InkPromoseSynchronous>

  {/* input promise */}
  <InputPromise max={10} text="Enter the directory name: ">
    {input => {
      const dir = validateDirectory(input);
      return (
        <NodeFs module="mkdir" args={[dir]}>
          <Text>{`Created directory, ${dir}`}</Text>
        </NodeFs>
      );
    }}
  </InputPromise>

  {/* input yes/no promise */}
  <InputYesNoPromise text="Proceed" reject={<Text>Exit</Text>}>
    <Text>Next steps...</Text>
  </InputYesNoPromise>
</InkPromiseSynchronous>

{/* nested containers */}
<InkPromoseErrorBoundary reject={error => console.error(error)}>
  <InkPromiseSynchronous>
    <InkPromiseAsynchronous suspense={<Loader />} resolve={<Checkmark>Step 1 complete</Checkmark>}>
      <NodeFs module="mkdir" args={["/nowhere"]} />
      <NodeFs module="mkdir" args={["/somewhere"]} />
    </InkPromiseAsynchronous>
    <InkPromiseAsynchronous suspense={<Loader />} resolve={<Checkmark>Step 2 complete</Checkmark>}>
      <NodeFs module="mkdir" args={["/nowhere2"]} />
      <NodeFs module="mkdir" args={["/somewhere2"]} />
    </InkPromiseAsynchronous>
  </InkPromiseSynchronous>
</InkPromoseErrorBoundary>

{/* while error, loop - how to exit loop? */}
<InkPromiseLoop count={3} reject={<Text>Directory not created.</Text>}>
  <InputPromise text="Enter the directory name: " />
  <NodeFs module="mkdir" args={["", () => {}]}>
    <Text>{`Directory created, ${path}`}</Text>
  </NodeFs>
</InkPromiseLoop>

```

catch/then/suspense code
[memoize calculations](https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations)
```
const isComponent = (test) => React.isValidElement(test);
const isFunction = (test) => typeof test === "function" && ! React.isValidElement(test);

const InkPromise = React.memo(({catch, then, promise, suspense, children = null}) => {
  const [state, setState] = React.useState(null);
  const [setThenComponent, ThenComponent] = React.useState(null);
  const [setCatchComponent, CatchComponent] = React.useState(null);
  React.useEffect(() => {
    promise
      .then(mixed => {
        const Component = isFunction(then) && then(mixed);
        if (isComponent(Component) === true) {
          setThenComponent(Component);
        } else if (isComponent(then) === true) {
          setCatchComponent(then);
        }
        setState(true);
      })
      .catch(error => {
        if (typeof catch === "undefined") {
          throw error;
        }
        const Component = isFunction(catch) && catch(error);
        if (isComponent(Component) === true) {
          setCatchComponent(Component);
        } else if (isComponent(catch) === true) {
          setCatchComponent(catch);
        }
        setState(false);
      });
  }, [promise]);
  return React.createElement(React.Fragment, {}, [
    state === null && isComponent(suspense) && suspense || null,
    children,
    state === true && ThenComponent || null,
    state === false && CatchComponent || null
  ]);
});
```

Node interfaces will each have a componentized action.

A wrapper component (NodeControl) will allow them to run sequentially ("sync", "async").  And have a onError, onDone, gateFalse, gateNull and children.

NodeContainer

NodeFsCompoent(function, args) 
* children can only be array or element
  * lookup how to detect React child - in delorean clone
  * `props.children ? React.cloneElement(props.children[0] || props.children, props) : null`
* attach callback property to children

```jsx
<NodeSynchronous>
  {/* if children is function, {children(callbackArgs)}, otherwise return children as-is */}
  <NodeFs function="mkdir" args={["", {}, () => {}]}>
  {(error, ...args) => error ? (
    setError(error)
  ) : (
    <Text>{JSON.stringify(args)}</Text>
  )}
  </NodeFs>
  <NodeFs function="chmod" args={["", "", () => {}]} />
  <NodeFs function="chown" args={["", 33, 33, () => {}]} />
  <NodeAsynchronous>
    <NodeFs function="cp" args={["", "", {}, () => {}]} />
    <NodeFs function="cp" args={["", "", {}, () => {}]} />
  </NodeAsynchronous>
</NodeSynchronous>
```

E.g.
```
{
  "access": {
    
  }
}
{
  // module: "fs",
  function: "access",
  args: {
    path: "",
    mode: "",
    callback: () => {}
  },
}
```


Callback API
fs.access(path[, mode], callback)
fs.appendFile(path, data[, options], callback)
fs.chmod(path, mode, callback)
fs.chown(path, uid, gid, callback)
fs.close(fd[, callback])
fs.copyFile(src, dest[, mode], callback)
fs.cp(src, dest[, options], callback)
fs.createReadStream(path[, options])
fs.createWriteStream(path[, options])
fs.fchmod(fd, mode, callback)
fs.fchown(fd, uid, gid, callback)
fs.fdatasync(fd, callback)
fs.fstat(fd[, options], callback)
fs.fsync(fd, callback)
fs.ftruncate(fd[, len], callback)
fs.futimes(fd, atime, mtime, callback)
fs.lchmod(path, mode, callback)
fs.lchown(path, uid, gid, callback)
fs.lutimes(path, atime, mtime, callback)
fs.link(existingPath, newPath, callback)
fs.lstat(path[, options], callback)
fs.mkdir(path[, options], callback)
fs.mkdtemp(prefix[, options], callback)
fs.open(path[, flags[, mode]], callback)
fs.opendir(path[, options], callback)
fs.read(fd, buffer, offset, length, position, callback)
fs.read(fd, [options,] callback)
fs.readdir(path[, options], callback)
fs.readFile(path[, options], callback)
fs.readlink(path[, options], callback)
fs.readv(fd, buffers[, position], callback)
fs.realpath(path[, options], callback)
fs.realpath.native(path[, options], callback)
fs.rename(oldPath, newPath, callback)
fs.rmdir(path[, options], callback)
fs.rm(path[, options], callback)
fs.stat(path[, options], callback)
fs.symlink(target, path[, type], callback)
fs.truncate(path[, len], callback)
fs.unlink(path, callback)
fs.unwatchFile(filename[, listener])
fs.utimes(path, atime, mtime, callback)
fs.watch(filename[, options][, listener])
fs.watchFile(filename[, options], listener)
fs.write(fd, buffer[, offset[, length[, position]]], callback)
fs.write(fd, string[, position[, encoding]], callback)
fs.writeFile(file, data[, options], callback)
fs.writev(fd, buffers[, position], callback)


----


Synchronous API
fs.accessSync(path[, mode])
fs.appendFileSync(path, data[, options])
fs.chmodSync(path, mode)
fs.chownSync(path, uid, gid)
fs.closeSync(fd)
fs.copyFileSync(src, dest[, mode])
fs.cpSync(src, dest[, options])
fs.existsSync(path)
fs.fchmodSync(fd, mode)
fs.fchownSync(fd, uid, gid)
fs.fdatasyncSync(fd)
fs.fstatSync(fd[, options])
fs.fsyncSync(fd)
fs.ftruncateSync(fd[, len])
fs.futimesSync(fd, atime, mtime)
fs.lchmodSync(path, mode)
fs.lchownSync(path, uid, gid)
fs.lutimesSync(path, atime, mtime)
fs.linkSync(existingPath, newPath)
fs.lstatSync(path[, options])
fs.mkdirSync(path[, options])
fs.mkdtempSync(prefix[, options])
fs.opendirSync(path[, options])
fs.openSync(path[, flags[, mode]])
fs.readdirSync(path[, options])
fs.readFileSync(path[, options])
fs.readlinkSync(path[, options])
fs.readSync(fd, buffer, offset, length, position)
fs.readSync(fd, buffer[, options])
fs.readvSync(fd, buffers[, position])
fs.realpathSync(path[, options])
fs.realpathSync.native(path[, options])
fs.renameSync(oldPath, newPath)
fs.rmdirSync(path[, options])
fs.rmSync(path[, options])
fs.statSync(path[, options])
fs.symlinkSync(target, path[, type])
fs.truncateSync(path[, len])
fs.unlinkSync(path)
fs.utimesSync(path, atime, mtime)
fs.writeFileSync(file, data[, options])
fs.writeSync(fd, buffer[, offset[, length[, position]]])
fs.writeSync(fd, string[, position[, encoding]])
fs.writevSync(fd, buffers[, position])


Promises
Class: FileHandle
Event: 'close'
filehandle.appendFile(data[, options])
filehandle.chmod(mode)
filehandle.chown(uid, gid)
filehandle.close()
filehandle.createReadStream([options])
filehandle.createWriteStream([options])
filehandle.datasync()
filehandle.fd
filehandle.read(buffer, offset, length, position)
filehandle.read([options])
filehandle.readableWebStream()
filehandle.readFile(options)
filehandle.readv(buffers[, position])
filehandle.stat([options])
filehandle.sync()
filehandle.truncate(len)
filehandle.utimes(atime, mtime)
filehandle.write(buffer[, offset[, length[, position]]])
filehandle.write(string[, position[, encoding]])
filehandle.writeFile(data, options)
filehandle.writev(buffers[, position])
fsPromises.access(path[, mode])
fsPromises.appendFile(path, data[, options])
fsPromises.chmod(path, mode)
fsPromises.chown(path, uid, gid)
fsPromises.copyFile(src, dest[, mode])
fsPromises.cp(src, dest[, options])
fsPromises.lchmod(path, mode)
fsPromises.lchown(path, uid, gid)
fsPromises.lutimes(path, atime, mtime)
fsPromises.link(existingPath, newPath)
fsPromises.lstat(path[, options])
fsPromises.mkdir(path[, options])
fsPromises.mkdtemp(prefix[, options])
fsPromises.open(path, flags[, mode])
fsPromises.opendir(path[, options])
fsPromises.readdir(path[, options])
fsPromises.readFile(path[, options])
fsPromises.readlink(path[, options])
fsPromises.realpath(path[, options])
fsPromises.rename(oldPath, newPath)
fsPromises.rmdir(path[, options])
fsPromises.rm(path[, options])
fsPromises.stat(path[, options])
fsPromises.symlink(target, path[, type])
fsPromises.truncate(path[, len])
fsPromises.unlink(path)
fsPromises.utimes(path, atime, mtime)
fsPromises.watch(filename[, options])
fsPromises.writeFile(file, data[, options])
