import SideBar from "../components/SideBar";

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
                    <div class="container-fluid">
                        Blank Template
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default HomePage;