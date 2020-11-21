import './App.scss';
import KittyPage from './components/KittyPage/KittyPage'
import KittyForm from './components/KittyForm/KittyForm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Intro from './components/Intro/Intro';
import NewKitty from './components/NewKitty/NewKitty';

function App() {
  return (
    <div className="buy-in-app">
      
      <Header></Header>
      
      <main>
        
        <Intro></Intro>
        
        <NewKitty></NewKitty>

        {/* <KittyForm></KittyForm> */}

        {/* <KittyPage></KittyPage> */}

      </main>
      
      <Footer></Footer>
    
    </div>
  );
}

export default App;
