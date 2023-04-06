import React, { useState, useEffect } from "react";


function Home() {
  const [tabData, setTabData] = useState([
]);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [tabCounter, setTabCounter] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem("tabData");
    if (data) {
      setTabData(JSON.parse(data));
      setActiveTab(JSON.parse(data)[0]?.id || "tab-1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tabData", JSON.stringify(tabData));
  }, [tabData]);

  const AñadirPest = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        let newTabId = Math.floor(Math.random() * 10000) + 1;
        while (tabData.some((tab) => tab.id === `Pes-${newTabId}`)) {
          newTabId = Math.floor(Math.random() * 10000) + 1;
        }
        const newTab = {
          id: `tab-${newTabId}`,
          name: file.name,
          content,
        };
        setTabData([...tabData, newTab]);
        setActiveTab(newTab.id);
      };
      reader.readAsText(file);
    });
    fileInput.click();
  };


  const Añadirpestb = async () => {
    const tabName = prompt("Escribe el nombre del archivo", `Pestaña ${tabCounter + 1}`);
    if (tabName) {
      // Agregar extensión al nombre del archivo
      const fileName = tabName.endsWith(".tw") ? tabName : `${tabName}.tw`;
      // Genera un ID único para la nueva pestaña
      let newTabId = Math.floor(Math.random() * 10000) + 1;
      while (tabData.some((tab) => tab.id === `tab-${newTabId}`)) {
        newTabId = Math.floor(Math.random() * 10000) + 1;
      }
  
      // Abre un diálogo para guardar el archivo
      const options = {
        suggestedName: fileName,
        types: [
          {
            description: "Text files",
            accept: {
              "text/plain": [".tw"]
            }
          }
        ]
      };
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      const writer = await writable.getWriter();
      await writer.write(new Blob([]));
      await writer.close();
  
      // Crea una nueva pestaña y añade el archivo a la pestaña
      const newTab = {
        id: `tab-${newTabId}`,
        name: tabName,
        content: "",
        file: await handle.getFile()
      };
      setTabData([...tabData, newTab]);
      setActiveTab(newTab.id);
      setTabCounter(tabCounter + 1);
    }
  };

  const handleDeleteTab = () => {

      const newTabData = tabData.filter((tab) => tab.id !== activeTab);
      setTabData(newTabData);
      setActiveTab(newTabData[0]?.id || "tab-1");
    
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleTextAreaChange = (event) => {
    setTabData((prevState) =>
      prevState.map((tab) => {
        if (tab.id === activeTab) {
          return { ...tab, content: event.target.value };
        }
        return tab;
      })
    );
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setTabData([]);
    setTabCounter(0);
  };

  const guardarArchivo = async () => {
    if (!window.showOpenFilePicker || !window.showSaveFilePicker) {
      console.log('La API File System Access no es compatible con este navegador');
      return;
    }
  
    const tab = tabData.find((tab) => tab.id === activeTab);
  
    try {
      // Obtener el contenido del área de texto de la pestaña activa
      const textarea = document.querySelector(`#area`);
      if (textarea) {
        const contenido = textarea.value;
  
        // Solicitar persistencia de acceso a la ubicación del archivo del new tab activo
        await navigator.storage.persist();
  
        // Escribir el contenido en el archivo del new tab activo
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: tab.name,
          types: [
            {
              description: 'Archivos de texto',
              accept: {
                'text/plain': ['.tw', '.tw'],
              },
            },
          ],
        });
  
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(contenido);
        await writableStream.close();
        console.log(`Archivo guardado en: ${fileHandle.name}`);
      } else {
        console.error('No se pudo encontrar el elemento de texto en el área de texto de la pestaña activa');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tab-container" id="ventana">
      <div className="tab-header">
      <div id="PESTAÑAS">
        {tabData.map((tab) => (
          <button id="pest"
            key={tab.id}
            className={`tab-button ${tab.id === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </button>
        ))}
        </div>
       
      </div>
  
      {tabData.length > 0 && (
        <div id="panel-area">
          <div className="tab-content">
            <textarea
              id="area"
              className="tab-textarea"
              value={tabData.find((tab) => tab.id === activeTab)?.content || ""}
              onChange={handleTextAreaChange}
            />
          </div>
          <div className="tab-content">
            <textarea id="area2" className="tab-textarea" />
          </div>
        </div>
      )}
  
       <div id="botones">
        <button id="bo" className="tab-button add-tab" onClick={Añadirpestb}>
          Nueva Pestaña
        </button>
        <button id="bo"  className="tab-button add-tab" onClick={AñadirPest}>
          Abrir Archivo
        </button>
        <button id="bo" 
          className="tab-button delete-tab"
          onClick={handleDeleteTab}
          
        >
          Eliminar Pestaña
        </button>
        <button id="bo" className="tab-button" onClick={guardarArchivo}>
  Guardar
</button>
        <button id="bo" 
          className="tab-button delete-tab"
          onClick={handleClearStorage}
        
        >
          Clear
        </button>
        </div>
    </div>
  );
}

export default Home;
