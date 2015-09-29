/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Franco
 */
public class Task {
    private int id;
    private String psyopsElement;
    private String desc;

    public Task(int id, String psyopsElement, String desc) {
        this.id = id;
        this.psyopsElement = psyopsElement;
        this.desc = desc;
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
     * @return the psyopsElement
     */
    public String getPsyopsElement() {
        return psyopsElement;
    }

    /**
     * @param psyopsElement the psyopsElement to set
     */
    public void setPsyopsElement(String psyopsElement) {
        this.psyopsElement = psyopsElement;
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
}
