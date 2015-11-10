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
public class Source {

    private int id;
    private int classID;
    private String classDesc;
    private String title;
    private int version;
    private String desc;
    private Date published;
    private Date encoded;
    private ArrayList<Excerpt> excrList;
    private boolean updated;

    /**
     * Get the value of id
     *
     * @return the value of id
     */
    public int getId() {
        return id;
    }

    /**
     * Set the value of id
     *
     * @param id new value of id
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
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the desc
     */
    public String getDesc() {
        return desc;
    }

    /**
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
    }

    /**
     * @return the published
     */
    public Date getPublished() {
        return published;
    }

    /**
     * @param published the published to set
     */
    public void setPublished(Date published) {
        this.published = published;
    }

    /**
     * @return the encoded
     */
    public Date getEncoded() {
        return encoded;
    }

    /**
     * @param encoded the encoded to set
     */
    public void setEncoded(Date encoded) {
        this.encoded = encoded;
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

    /**
     * @return the version
     */
    public int getVersion() {
        return version;
    }

    /**
     * @param version the version to set
     */
    public void setVersion(int version) {
        this.version = version;
    }

    /**
     * @return the updated
     */
    public boolean isUpdated() {
        return updated;
    }

    /**
     * @param updated the updated to set
     */
    public void setUpdated(boolean updated) {
        this.updated = updated;
    }

}
