/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.Date;

/**
 *
 * @author Franco
 */
public class User {

    private int id;
    private int classID;
    private String classDesc;
    private String uname;
    private String pword;
    private String nameTitle;
    private String nameFirst;
    private String nameOther;
    private String nameLast;
    private String fullName;
    private String status;
    private Date lastSeen;
    
    public User(){
        
    }
    public User(int id, int classID, String uname, String nameTitle, String nameFirst, String nameOther, String nameLast) {
        this.id = id;
        this.classID = classID;
        this.uname = uname;
        this.nameTitle = nameTitle;
        this.nameFirst = nameFirst;
        this.nameOther = nameOther;
        this.nameLast = nameLast;
        LogEntry ev;
    }

    public String generateFullName() {
        String fullName = (nameTitle == null ? "" : nameTitle + ". ")
                + (nameFirst == null ? "" : nameFirst + " ")
                + (nameOther == null ? "" : nameOther + " ")
                + (nameLast == null ? "" : nameLast + " ");
        if (fullName == "") {
            fullName = uname;
        }
        this.fullName = fullName;

        return fullName;
    }

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
     * @return the uname
     */
    public String getUname() {
        return uname;
    }

    /**
     * @param uname the uname to set
     */
    public void setUname(String uname) {
        this.uname = uname;
    }

    /**
     * @return the nameTitle
     */
    public String getNameTitle() {
        return nameTitle;
    }

    /**
     * @param nameTitle the nameTitle to set
     */
    public void setNameTitle(String nameTitle) {
        this.nameTitle = nameTitle;
    }

    /**
     * @return the nameFirst
     */
    public String getNameFirst() {
        return nameFirst;
    }

    /**
     * @param nameFirst the nameFirst to set
     */
    public void setNameFirst(String nameFirst) {
        this.nameFirst = nameFirst;
    }

    /**
     * @return the nameOther
     */
    public String getNameOther() {
        return nameOther;
    }

    /**
     * @param nameOther the nameOther to set
     */
    public void setNameOther(String nameOther) {
        this.nameOther = nameOther;
    }

    /**
     * @return the nameLast
     */
    public String getNameLast() {
        return nameLast;
    }

    /**
     * @param nameLast the nameLast to set
     */
    public void setNameLast(String nameLast) {
        this.nameLast = nameLast;
    }

    /**
     * @return the fullName
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
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
     * @return the lastSeen
     */
    public Date getLastSeen() {
        return lastSeen;
    }

    /**
     * @param lastSeen the lastSeen to set
     */
    public void setLastSeen(Date lastSeen) {
        this.lastSeen = lastSeen;
    }

    /**
     * @return the pword
     */
    public String getPword() {
        return pword;
    }

    /**
     * @param pword the pword to set
     */
    public void setPword(String pword) {
        this.pword = pword;
    }

}
