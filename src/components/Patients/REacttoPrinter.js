import * as React from "react";
import ReactToPrint from "react-to-print";
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { FunctionalComponentToPrint } from "./CompToPrint";
import { Promise } from 'bluebird'
import { history } from "../../helpers/history"
import { actions } from "../../actions/actions"
// import { Button } from "@material-ui/core"
import Loading from '../Loading'
export const FunctionalComponentWithFunctionalComponentToPrint = ({ addNewPatient, id }) => {

  const dispatch = useDispatch()
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");
  // const [finalDatas, setFinalDatas] = React.useState([])

  // const patient = useSelector((state) => state.reducers.patient)
  const finalDatas = useSelector((state) => state.reducers.finalDatas)
  const rloading = useSelector((state) => state.reducers.loading)
  // React.useEffect(() => {
  //   const pat = getCurentPatient()
  //   const data = dispatch(actions.getPrintData(pat))
  //   console.log(data)
  //   setFinalDatas(data)
  // }, [])

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
    dispatch(actions.getPrintDone(id))
    console.log(`history`, history)
    addNewPatient()
  }, [addNewPatient, dispatch, id]);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    dispatch(actions.getPrintStart(id))
  }, [dispatch, id]);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <button>
        Print using Printer
      </button>
    ); // eslint-disable-line max-len
  }, []);

  if (rloading) {
    return (<div><Loading />
    </div>)
  }
  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p className="indicator">Please Wait......</p>}
      <FunctionalComponentToPrint ref={componentRef} text={text} finalDatas={finalDatas} />
    </div>
  );
};
