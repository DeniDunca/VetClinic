package com.project.vetClinic.exporter;

import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;

@Component
public class XMLFileExporter implements FileExporter {
    public XMLFileExporter() {
    }

    @Override
    public String exportData(Object object) {
        String xmlContent = null;
        try {

            JAXBContext jaxbContext = JAXBContext.newInstance(object.getClass());

            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter sw = new StringWriter();

            jaxbMarshaller.marshal(object, sw);

            xmlContent = sw.toString();
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return xmlContent;
    }
}
