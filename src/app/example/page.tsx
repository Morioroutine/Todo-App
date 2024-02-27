import Component1 from './component1';
import Component2 from './component2';
import Component3 from './component3';

export default function page () {
    const name1 = "1"
    const name2 = "2"

    return (<div>
        <h1>Hello World</h1>
        <Component1 name1= {name1} />
        <Component2 name2= {name2}/>
        <Component3 name3= "太郎"/>

    </div>)
}



