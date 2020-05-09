import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
        <div id="wrapper">
            <SideBar/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    {/* Inserte aqui TopBar */}
                    <TopBar/>
                    <div class="container-fluid">
                        Single Patient
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default HomePage;