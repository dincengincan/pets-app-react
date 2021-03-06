import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';


class Pet extends React.Component{
    
    constructor(props){
        super(props);
    }

    
    addFavourite = (pet) => {
        //Önce tıklanan peti API'a ekle ki favoritePage güncellensin.
        Axios
        .post("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites", {
            pet: pet,
            owner: "Engin Can"
        }).then(data => {
            if(data){
                this.props.getFavouritePets();
            }
        })
        
    }

    
    
    removeFavourite = (id) => {
        /*//Önce PetListteki favoritePets state'inden çıkar ki butonu yeşile döndürsün.
        this.props.removeFavouriteFromState(id);
        //Daha sonra API'dan çıkar ki favoritePage güncellensin.
        return fetch(url + '/' + MockAPIid, {
          method: 'delete'
        })
        .then(response => response.json());*/
       
        
        //Find the Item will be removed
        const selectedItem = this.props.favouritePets.find(pet => {
            return pet.pet.id === id;
        })
        //Determine its mockAPIid
        const selectedItemId = selectedItem.mockApiId
        
        Axios
        .delete(`http://5dd7af92505c590014d3b4ac.mockapi.io/favorites/${selectedItemId}`)
        .then(data => {
        if(data){
            this.props.getFavouritePets();
        }
    })
        

    }
    
    render() {
        
        const {name, image, age, breed, id, onScroll } = this.props.pet;
        const detailPage = `/details/${id}`;
        console.log(this.props);
        return(
            <div  className="col-lg-6 col-md-4 mb-4">
            <div className="card h-100">
                <Link to={detailPage}>
                    <img onScroll={onScroll} className="card-img-top"  src={image} alt="" style={{height: "292px"}}/>
                </Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to={detailPage}>{name}</Link>
                        <div>
                            <span className="badge badge-primary" style={{fontSize: "12px"}}>{breed}</span>
                        </div>
                        <div>
                            <span className="badge badge-warning" style={{fontSize: "12px"}}>{age}</span>
                        </div>
                    </h4>
                    
                </div>
                <div className="card-footer">
                    
                    {
                        this.props.isFavourite
                        ? <button onClick={() => this.removeFavourite(this.props.pet.id)} type="button" class="btn btn-outline-danger">Remove from Favorites</button>
                        : <button onClick={() => this.addFavourite(this.props.pet)} type="button" class="btn btn-outline-success">Add to Favorites</button>
                    }
                    
                    
                   
                </div>
            </div>
        </div>

        )
    }
}
export default Pet;
