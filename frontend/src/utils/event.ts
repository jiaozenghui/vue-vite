export const addEvent = (selector:any, type:any, fn:any) => {
  let nodesEl = document.querySelectorAll(selector)
  let length = nodesEl.length
  for (let i = 0; i < length; i++) {
    let node = nodesEl[i]
    node.removeEventListener(type, fn)
    node.addEventListener(type, fn)
  }
}
