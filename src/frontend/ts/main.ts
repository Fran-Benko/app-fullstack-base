class Main implements EventListenerObject, HandlerPost{
    public myFramework: MyFramework;
    
    
    
    public main(): void {
        console.log("Se ejecuto el metodo main!!!");
        this.myFramework = new MyFramework();
        
        let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("Llego la respuesta!!!!");
                        console.log(xhr.responseText);

                        let listaDis: Array<Device> = JSON.parse(xhr.responseText);
                        
                        for (let disp of listaDis ){
                        
                            let listaDisp = this.myFramework.getElementById("listaDisp");
                            listaDisp.innerHTML += `<li class="collection-item avatar">
                            <img src="./static/images/lightbulb.png" alt="" class="circle">
                            <span class="nombreDisp">${disp.name}</span>
                            <p>${disp.description}
                            </p>
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label >
                                      Off
                                      <input id="disp_${disp.id}" type="checkbox">
                                      <span class="lever"></span>
                                      On
                                    </label>
                                  </div>
                                  <a href="/devices/edit/${disp.id}" class="btn-floating btn-small waves-effect waves-blue btn-edit-device tooltipped" data-position="bottom" data-tooltip="Editar">
                                    <i id ="edit-${disp.id}" class="small material-icons">edit</i>
                                  </a>
                                  <a href="/devices/delete/${disp.id}" class="btn-floating btn-small waves-effect waves-red btn-delete-device tooltipped" data-position="bottom" data-tooltip="Eliminar">
                                    <i id ="delete-${disp.id}" class="small material-icons">delete</i>
                                  </a>
                            </a>
                          </li>`;
                         
                            
                        }

                        for (let disp of listaDis) {
                            let checkDisp = this.myFramework.getElementById("disp_" + disp.id);
                            checkDisp.addEventListener("click", this);
                        }
                    } else {
                        alert("error!!")
                    }
                }
            }
            xhr.open("GET","http://localhost:8000/devices",true)
            xhr.send();
         
    }
    
    public handleEvent(ev: Event) {
    
    
        let objetoClick: HTMLElement = <HTMLElement>ev.target;
        
        
        if (objetoClick.textContent == "+ Agregar") {
            let modal = this.myFramework.getElementById('myModal');
            let span = this.myFramework.getElementById("cruzClose");
            
            // When the user clicks the button, open the modal 
            modal.style.display = "block";
            
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    responsePost(status: number, response: string) {
        alert(response);
    }

    
}
window.addEventListener("load", ()=> {
    let miObjMain: Main = new Main();
    miObjMain.main();

    let boton:HTMLElement = miObjMain.myFramework.getElementById("boton");
    boton.addEventListener("click", miObjMain);
    
    let btnCerrar: HTMLElement = miObjMain.myFramework.getElementById("btnCerrar");
    btnCerrar.addEventListener("dblclick", miObjMain);
    
});