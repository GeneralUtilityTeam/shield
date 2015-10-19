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
public class LogEntry {
    private int id;
    private int userID;
    private String userUname;
    private int entryClassId;
    private String entryClassDesc;
    private String entryDesc;
    private Date date;

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
     * @return the userID
     */
    public int getUserID() {
        return userID;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(int userID) {
        this.userID = userID;
    }

    /**
     * @return the userUname
     */
    public String getUserUname() {
        return userUname;
    }

    /**
     * @param userUname the userUname to set
     */
    public void setUserUname(String userUname) {
        this.userUname = userUname;
    }

    /**
     * @return the entryClassId
     */
    public int getEntryClassId() {
        return entryClassId;
    }

    /**
     * @param entryClassId the entryClassId to set
     */
    public void setEntryClassId(int entryClassId) {
        this.entryClassId = entryClassId;
    }

    /**
     * @return the entryClassDesc
     */
    public String getEntryClassDesc() {
        return entryClassDesc;
    }

    /**
     * @param entryClassDesc the entryClassDesc to set
     */
    public void setEntryClassDesc(String entryClassDesc) {
        this.entryClassDesc = entryClassDesc;
    }

    /**
     * @return the entryDesc
     */
    public String getEntryDesc() {
        return entryDesc;
    }

    /**
     * @param entryDesc the entryDesc to set
     */
    public void setEntryDesc(String entryDesc) {
        this.entryDesc = entryDesc;
    }

    /**
     * @return the date
     */
    public Date getDate() {
        return date;
    }

    /**
     * @param date the date to set
     */
    public void setDate(Date date) {
        this.date = date;
    }
}
