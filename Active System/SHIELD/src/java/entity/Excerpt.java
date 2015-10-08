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
public class Excerpt {
    private int id;
    private int sourceID;
    private int categoryID;
    private String text;
    private String sublocality;
    private String locality;
    private String administrativeAreaLevel2;
    private String administrativeAreaLevel1;
    private String country;
    private double lat;
    private double lng;
    
    private double strength;

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
     * @return the sourceID
     */
    public int getSourceID() {
        return sourceID;
    }

    /**
     * @param sourceID the sourceID to set
     */
    public void setSourceID(int sourceID) {
        this.sourceID = sourceID;
    }

    /**
     * @return the categoryID
     */
    public int getCategoryID() {
        return categoryID;
    }

    /**
     * @param categoryID the categoryID to set
     */
    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    /**
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * @param text the text to set
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * @return the sublocality
     */
    public String getSublocality() {
        return sublocality;
    }

    /**
     * @param sublocality the sublocality to set
     */
    public void setSublocality(String sublocality) {
        this.sublocality = sublocality;
    }

    /**
     * @return the locality
     */
    public String getLocality() {
        return locality;
    }

    /**
     * @param locality the locality to set
     */
    public void setLocality(String locality) {
        this.locality = locality;
    }
    /**
     * @return the country
     */
    public String getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * @return the lat
     */
    public double getLat() {
        return lat;
    }

    /**
     * @param lat the lat to set
     */
    public void setLat(double lat) {
        this.lat = lat;
    }

    /**
     * @return the lng
     */
    public double getLng() {
        return lng;
    }

    /**
     * @param lng the lng to set
     */
    public void setLng(double lng) {
        this.lng = lng;
    }

    /**
     * @return the administrativeAreaLevel2
     */
    public String getAdministrativeAreaLevel2() {
        return administrativeAreaLevel2;
    }

    /**
     * @param administrativeAreaLevel2 the administrativeAreaLevel2 to set
     */
    public void setAdministrativeAreaLevel2(String administrativeAreaLevel2) {
        this.administrativeAreaLevel2 = administrativeAreaLevel2;
    }

    /**
     * @return the administrativeAreaLevel1
     */
    public String getAdministrativeAreaLevel1() {
        return administrativeAreaLevel1;
    }

    /**
     * @param administrativeAreaLevel1 the administrativeAreaLevel1 to set
     */
    public void setAdministrativeAreaLevel1(String administrativeAreaLevel1) {
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
    }

    /**
     * @return the strength
     */
    public double getStrength() {
        return strength;
    }

    /**
     * @param strength the strength to set
     */
    public void setStrength(double strength) {
        this.strength = strength;
    }
    
}
