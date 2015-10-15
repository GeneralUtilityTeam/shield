/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Franco
 */
public class EEntity {
    private int id;
    private String name;
    private int classID;
    private String classDesc;
    private ArrayList<Excerpt> excrList;
    
    //CC properties
    private Date dateStart;
    private Date dateEnd;
    
    //CR properties
    private int ccParentID;
    private ArrayList<EEntity> cvList;
    
    //CV properties
    private int crit;
    private int acce;
    private int recu;
    private int vuln;
    private int effe;
    private int reco;
    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the classID
     */
    public int getClassID() {
        return classID;
    }

    /**
     * @param classID the classID to set
     */
    public void setClassID(int classID) {
        this.classID = classID;
    }

    /**
     * @return the classDesc
     */
    public String getClassDesc() {
        return classDesc;
    }

    /**
     * @param classDesc the classDesc to set
     */
    public void setClassDesc(String classDesc) {
        this.classDesc = classDesc;
    }


    /**
     * @return the dateStart
     */
    public Date getDateStart() {
        return dateStart;
    }

    /**
     * @param dateStart the dateStart to set
     */
    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    /**
     * @return the dateEnd
     */
    public Date getDateEnd() {
        return dateEnd;
    }

    /**
     * @param dateEnd the dateEnd to set
     */
    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
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

    /**
     * @return the crit
     */
    public int getCrit() {
        return crit;
    }

    /**
     * @param crit the crit to set
     */
    public void setCrit(int crit) {
        this.crit = crit;
    }

    /**
     * @return the acce
     */
    public int getAcce() {
        return acce;
    }

    /**
     * @param acce the acce to set
     */
    public void setAcce(int acce) {
        this.acce = acce;
    }

    /**
     * @return the recu
     */
    public int getRecu() {
        return recu;
    }

    /**
     * @param recu the recu to set
     */
    public void setRecu(int recu) {
        this.recu = recu;
    }

    /**
     * @return the vuln
     */
    public int getVuln() {
        return vuln;
    }

    /**
     * @param vuln the vuln to set
     */
    public void setVuln(int vuln) {
        this.vuln = vuln;
    }

    /**
     * @return the effe
     */
    public int getEffe() {
        return effe;
    }

    /**
     * @param effe the effe to set
     */
    public void setEffe(int effe) {
        this.effe = effe;
    }

    /**
     * @return the reco
     */
    public int getReco() {
        return reco;
    }

    /**
     * @param reco the reco to set
     */
    public void setReco(int reco) {
        this.reco = reco;
    }

    /**
     * @return the excrIDList
     */

    /**
     * @return the ccParentID
     */
    public int getCcParentID() {
        return ccParentID;
    }

    /**
     * @param ccParentID the ccParentID to set
     */
    public void setCcParentID(int ccParentID) {
        this.ccParentID = ccParentID;
    }

    /**
     * @return the excrList
     */
    public ArrayList<Excerpt> getExcrList() {
        return excrList;
    }

    /**
     * @param excrList the excrList to set
     */
    public void setExcrList(ArrayList<Excerpt> excrList) {
        this.excrList = excrList;
    }
}
