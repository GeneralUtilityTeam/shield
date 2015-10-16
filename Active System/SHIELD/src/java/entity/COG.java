/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;

/**
 *
 * @author Franco
 */
public class COG {
    private int missionID;
    private String nodeJSON;
    private String edgeJSON;
    
    private ArrayList<EEntity> ccList;
    private ArrayList<EEntity> crList;
    private ArrayList<EEntity> cvList;
    
    private ArrayList<IntTuple> relCRList;
    private ArrayList<IntTuple> relRVList;
    
    private ArrayList<EEntity> eentList; //for initial creation

    /**
     * @return the nodeJSON
     */
    public String getNodeJSON() {
        return nodeJSON;
    }

    /**
     * @param nodeJSON the nodeJSON to set
     */
    public void setNodeJSON(String nodeJSON) {
        this.nodeJSON = nodeJSON;
    }

    /**
     * @return the edgeJSON
     */
    public String getEdgeJSON() {
        return edgeJSON;
    }

    /**
     * @param edgeJSON the edgeJSON to set
     */
    public void setEdgeJSON(String edgeJSON) {
        this.edgeJSON = edgeJSON;
    }

    /**
     * @return the ccList
     */
    public ArrayList<EEntity> getCcList() {
        return ccList;
    }

    /**
     * @param ccList the ccList to set
     */
    public void setCcList(ArrayList<EEntity> ccList) {
        this.ccList = ccList;
    }

    /**
     * @return the crList
     */
    public ArrayList<EEntity> getCrList() {
        return crList;
    }

    /**
     * @param crList the crList to set
     */
    public void setCrList(ArrayList<EEntity> crList) {
        this.crList = crList;
    }

    /**
     * @return the missionID
     */
    public int getMissionID() {
        return missionID;
    }

    /**
     * @param missionID the missionID to set
     */
    public void setMissionID(int missionID) {
        this.missionID = missionID;
    }

    /**
     * @return the eentList
     */
    public ArrayList<EEntity> getEentList() {
        return eentList;
    }

    /**
     * @param eentList the eentList to set
     */
    public void setEentList(ArrayList<EEntity> eentList) {
        this.eentList = eentList;
    }

    /**
     * @return the relCRList
     */
    public ArrayList<IntTuple> getRelCRList() {
        return relCRList;
    }

    /**
     * @param relCRList the relCRList to set
     */
    public void setRelCRList(ArrayList<IntTuple> relCRList) {
        this.relCRList = relCRList;
    }

    /**
     * @return the relRVList
     */
    public ArrayList<IntTuple> getRelRVList() {
        return relRVList;
    }

    /**
     * @param relRVList the relRVList to set
     */
    public void setRelRVList(ArrayList<IntTuple> relRVList) {
        this.relRVList = relRVList;
    }

    /**
     * @return the cvList
     */
    public ArrayList<EEntity> getCvList() {
        return cvList;
    }

    /**
     * @param cvList the cvList to set
     */
    public void setCvList(ArrayList<EEntity> cvList) {
        this.cvList = cvList;
    }
    
}
