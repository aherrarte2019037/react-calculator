import './App.css';
import Calculator from './Calculator/Calculator';

function App() {

  return (
    <div className="w-100 h-100" style={{ width: '100svw', height : '100svh', display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <img src={"/static/images/1.png"} border="0"/>
      <img src={"/static/images/2.png"} border="0"/>
      <img src={"/static/images/3.png"} border="0"/>
      <img src={"/static/images/4.png"} border="0"/>
    </div>
  );
}

export default App;
