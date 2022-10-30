export default function html ([first, ...string], ...value){
    return value.reduce(
        (prev, cur) => prev.concat(cur, string.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer){
    let state = reducer()
    // minh se dung dom element (index.html) de luu vao root
    const roots = new Map(); //map co the dat bat ky kieu du lieu nao

    function render(){ // nhờ roots render loc ra view
        for(const[root, component] of roots){ // component la thanh phan chua view
            const output = component() // la function return ra chuoi html
            root.innerHTML= output
        }
    }
    return {
        //attach nhận cái view và đẩy ra id trong thẻ div (index.html)
        attach(component, root){
            roots.set(root, component)
            render()
        },
        // connect từ store render view
        connect(selector = state => state){
            return component => (props, ...args) =>
                component(Object.assign({},props, selector(state), ...args))
        },
        dispatch(action, ...args){
            state = reducer(state, action, args)
            render()
        }
    
    }
}
