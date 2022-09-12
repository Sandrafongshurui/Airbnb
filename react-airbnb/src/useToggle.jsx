// import { useState, useCallback } from "react";

// // Toggles between true or false
// const useToggle = (initialValue = false) => {
//   console.log("use toggle, will render but not return")
//   const [toggle, setToggle] = useState(initialValue);
//   //useCallBack "cached" the function and will not render it unless theres a chang in status
//   //ie when it toggles the open close
//   //bascially use toggle is toggle + set toggle state
//   return [toggle, useCallback(() => setToggle(status => !status), [])];
// }

// export default useToggle;