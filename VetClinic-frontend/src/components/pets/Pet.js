import { useRef, useState} from "react";
import classes from './Pet.module.css'
import Card from "../../utils/Card";

const Pet = (props) => {
    const[isModify, setIsModify] = useState(false);
    const name = useRef(props.name);
    const race = useRef(props.race);
    const type = useRef(props.type);
    const age = useRef(props.age);
    const info = useRef(props.info);

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);

    function modifyHandler() {
        setIsModify(true);
    }

    function backHandler() {
        setIsModify(false);
    }

    const fetchPets = async () => {
        await fetch('http://localhost:8081/api/pet/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                name: name.current.value,
                race: race.current.value,
                type: type.current.value,
                age: age.current.value,
                info: info.current.value,
            })
        })
    }

    const fetchPetPhoto = async (currFile) => {
        const fd = new FormData();
        fd.append('file',currFile);
        fd.append('id',props.id);
        await fetch('http://localhost:8081/api/pet/upload', {
            method: 'POST',
            body: fd
        })
    }

    function confirmHandler() {

        fetchPets().then(r => {

            if(typeof selectedFiles !== 'undefined') {
                let currFile = selectedFiles[0];
                console.log(currFile);
                setCurrentFile(currFile);

                fetchPetPhoto(currFile).then(r => {
                   //console.log(r);
                    props.update();
                });
            }
            //props.update();
        });
        setIsModify(false);
    }

    function deleteHandler() {
        const fetchPets = async () => {
            await fetch(`http://localhost:8081/api/pet/delete/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }
        fetchPets().then(r => props.update());
    }

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    }

    const petPhoto = "data:image/png;base64," + props.photo;
    return(
        <Card>
          <li>
              {isModify &&
              <div className={classes.actions}>
                  <input defaultValue={props.name} ref={name}/>
                  <input defaultValue={props.race} ref={race}/>
                  <input defaultValue={props.type} ref={type}/>
                  <input defaultValue={props.age} ref={age}/>
                  <input defaultValue={props.info} ref={info}/>
                  <img alt={'cat'} src={petPhoto}/>
                  <label>Select a file:</label>
                  <input type="file" onChange={selectFile}/>
              </div>}
              {!isModify && <div className={classes.actions}>
                  <div>Name:{props.name} </div>
                  <div>Race:{props.race}</div>
                  <div>Type:{props.type}</div>
                  <div>Age:{props.age}</div>
                  <div>Info:{props.info}</div>
                  <div>
                      Photo:
                      <img alt={'cat'} src={petPhoto}/>
                  </div>
              </div>}
              {isModify &&
                  <div className={classes.actions}>
                      <button onClick={confirmHandler}>Confirm</button>
                      <button onClick={backHandler}>Back</button>
                  </div>
              }
              {!isModify &&
                  <div className={classes.actions}>
                        <button onClick={modifyHandler}>Modify Pet</button>
                        <button  onClick={deleteHandler}>Delete Pet</button>
                  </div>
              }

          </li>
        </Card>
    );
};

export default Pet;