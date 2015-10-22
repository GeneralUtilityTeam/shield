/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Area;
import entity.EEntity;
import entity.Excerpt;
import entity.PsyopObjective;
import entity.Source;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Franco
 */
public class IntelligenceDAO {

    // -- SOURCES
    public Source GetSource(int sourceID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_source`(?);");
            pstmt.setInt(1, sourceID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                Source src = new Source();

                src.setId(sourceID);
                src.setClassID(rs.getInt(1));
                src.setClassDesc(rs.getString(2));
                src.setTitle(rs.getString(3));
                src.setDesc(rs.getString(4));
                src.setPublished(rs.getDate(5));
                src.setEncoded(rs.getDate(6));

                cn.close();
                return src;
            }
        } catch (SQLException ex) {
            Logger.getLogger(IntelligenceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public ArrayList<Source> GetAllSources() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_source`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Source> srcList = new ArrayList<Source>();
                do {
                    Source src = new Source();
                    src.setId(rs.getInt(1));
                    src.setClassID(rs.getInt(2));
                    src.setClassDesc(rs.getString(3));
                    src.setTitle(rs.getString(4));
                    src.setDesc(rs.getString(5));
                    src.setPublished(rs.getDate(6));
                    src.setEncoded(rs.getDate(7));

                    srcList.add(src);
                } while (rs.next());
                cn.close();
                return srcList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(IntelligenceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public int AddSource(int userID, Source src) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`add_source`(?, ?, ?, ?, ?);");
            pstmt.setInt(1, userID);
            pstmt.setInt(2, src.getClassID());
            pstmt.setString(3, src.getTitle());
            pstmt.setString(4, src.getDesc());
            pstmt.setDate(5, new java.sql.Date(src.getPublished().getTime()));

            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return -1;
            } else {
                return rs.getInt(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    }

    // -- EXCERPTS
    public Excerpt GetExcerpt(int excerptID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_excerpt`(?);");
            pstmt.setInt(1, excerptID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                Excerpt excr = new Excerpt();
                Area area = new Area();

                excr.setId(excerptID);
                excr.setCategoryID(rs.getInt(1));
                excr.setCategoryDesc(rs.getString(2));
                excr.setText(rs.getString(3));
                area.setLevel8(rs.getString(4));
                area.setLevel7(rs.getString(5));
                area.setLevel6(rs.getString(6));
                area.setLevel5(rs.getString(7));
                area.setLevel4(rs.getString(8));
                area.setLevel3(rs.getString(9));
                area.setLevel2(rs.getString(10));
                area.setLevel1(rs.getString(11));
                excr.setArea(area);

                pstmt = cn.prepareStatement("CALL `shield`.`get_all_tag_excerpt`(?);");
                pstmt.setInt(1, excerptID);
                rs = pstmt.executeQuery();
                rs.next();
                if (rs.getRow() != 0) {
                    ArrayList<String> tagList = new ArrayList<String>();
                    do {
                        tagList.add(rs.getString(1));
                    } while (rs.next());

                    excr.setTagList(tagList);
                }

                cn.close();
                return excr;
            }
        } catch (SQLException ex) {
            Logger.getLogger(IntelligenceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public ArrayList<Excerpt> GetExcerptOfSource(int sourceID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_excerpt_source`(?)");
            pstmt.setInt(1, sourceID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
                do {
                    Excerpt excr = new Excerpt();
                    Area area = new Area();

                    excr.setId(rs.getInt(1));
                    excr.setCategoryID(rs.getInt(2));
                    excr.setCategoryDesc(rs.getString(3));
                    excr.setText(rs.getString(4));
                    area.setLevel8(rs.getString(5));
                    area.setLevel7(rs.getString(6));
                    area.setLevel6(rs.getString(7));
                    area.setLevel5(rs.getString(8));
                    area.setLevel4(rs.getString(9));
                    area.setLevel3(rs.getString(10));
                    area.setLevel2(rs.getString(11));
                    area.setLevel1(rs.getString(12));
                    excr.setArea(area);
                    excrList.add(excr);

                } while (rs.next());

                cn.close();
                return excrList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public ArrayList<Excerpt> GetExcerptOfEEntity(int eentID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_class_eentity`(?)");
            pstmt.setInt(1, eentID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return null;
            }

            int eentityClass = rs.getInt(1);

            pstmt = cn.prepareStatement("CALL `shield`.`get_all_excerpt_eentity`(?)");
            pstmt.setInt(1, eentID);
            rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
                do {
                    Excerpt excr = new Excerpt();
                    Area area = new Area();

                    excr.setId(rs.getInt(1));
                    excr.setText(rs.getString(2));
                    area.setLat(rs.getDouble(11));
                    area.setLng(rs.getDouble(12));
                    excr.setArea(area);
                    excrList.add(excr);
                    excr.setEentityClassID(eentityClass);

                } while (rs.next());

                cn.close();
                return excrList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public int AddExcerpt(int userID, Excerpt excr) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            Area area = excr.getArea();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`add_excerpt`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, userID);
            pstmt.setInt(2, excr.getSourceID());
            pstmt.setInt(3, excr.getCategoryID());
            pstmt.setString(4, excr.getText());
            pstmt.setString(5, area.getLevel8());
            pstmt.setString(6, area.getLevel7());
            pstmt.setString(7, area.getLevel6());
            pstmt.setString(8, area.getLevel5());
            pstmt.setString(9, area.getLevel4());
            pstmt.setString(10, area.getLevel3());
            pstmt.setString(11, area.getLevel2());
            pstmt.setString(12, area.getLevel1());
            pstmt.setDouble(13, area.getLat());
            pstmt.setDouble(14, area.getLng());

            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return -1;
            } else {
                int excerptID = rs.getInt(1);
                ArrayList<String> tagList = excr.getTagList();
                pstmt = cn.prepareStatement("CALL `shield`.`link_excerpt_tag`(?, ?);");
                pstmt.setInt(1, excerptID);
                for (String s : tagList) {
                    System.out.println("Linking excerpt id " + excerptID + " string " + s);
                    pstmt.setString(2, s);
                    pstmt.execute();
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    }

    public ArrayList<Excerpt> PrimarySearch(String query) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`search_excerpts`(?);");
            pstmt.setString(1, query);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
                do {
                    Excerpt excr = new Excerpt();
                    excr.setId(rs.getInt(1));
                    excr.setCategoryID(rs.getInt(2));
                    excr.setCategoryDesc(rs.getString(3));
                    excr.setText(rs.getString(4));
                    excr.setPublished(rs.getDate(5));

                    Area area = new Area();
                    area.setLat(rs.getDouble(6));
                    area.setLng(rs.getDouble(7));
                    area.setLevel8(rs.getString(8));
                    area.setLevel7(rs.getString(9));
                    area.setLevel6(rs.getString(10));
                    area.setLevel5(rs.getString(11));
                    area.setLevel4(rs.getString(12));
                    area.setLevel3(rs.getString(13));
                    area.setLevel2(rs.getString(14));
                    area.setLevel1(rs.getString(15));

                    excr.setStrength(rs.getDouble(16));
                    excr.setArea(area);
                    excrList.add(excr);
                } while (rs.next());
                cn.close();
                return excrList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(IntelligenceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    // -- EENTITY
    public ArrayList<EEntity> GetAllEEntityOfMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_eentity_mission`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<EEntity> eentList = new ArrayList<EEntity>();
                do {
                    EEntity eent = new EEntity();
                    Area area = new Area();

                    eent.setId(rs.getInt(1));
                    eent.setClassID(rs.getInt(2));
                    eent.setClassDesc(rs.getString(3));
                    eent.setName(rs.getString(4));

                    PreparedStatement pstmt2 = cn.prepareStatement("CALL shield.get_all_excerpt_eentity(?);");
                    pstmt2.setInt(1, eent.getId());
                    ResultSet rs2 = pstmt2.executeQuery();
                    rs2.next();

                    if (rs2.getRow() != 0) {
                        ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
                        do {
                            Excerpt excr = new Excerpt();
                            Area area2 = new Area();

                            excr.setId(rs2.getInt(1));
                            excr.setText(rs2.getString(2));
                            area2.setLevel8(rs2.getString(3));
                            area2.setLevel7(rs2.getString(4));
                            area2.setLevel6(rs2.getString(5));
                            area2.setLevel5(rs2.getString(6));
                            area2.setLevel4(rs2.getString(7));
                            area2.setLevel3(rs2.getString(8));
                            area2.setLevel2(rs2.getString(9));
                            area2.setLevel1(rs2.getString(10));
                            area2.setLat(rs2.getDouble(11));
                            area2.setLng(rs2.getDouble(12));

                            excr.setEentityEnabled(true);

                            excr.setArea(area2);

                            excrList.add(excr);
                        } while (rs2.next());
                        eent.setExcrList(excrList);
                    }

                    eentList.add(eent);

                } while (rs.next());

                cn.close();
                return eentList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public boolean AddEEntitiesToMission(int missionID, int editorID, ArrayList<EEntity> eentList) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`delete_all_eentity_mission`(?);");
            pstmt.setInt(1, missionID);
            pstmt.executeUpdate();

            pstmt = cn.prepareStatement("CALL `shield`.`add_eentity`(?, ?, ?, ? );");
            PreparedStatement pstmt2 = cn.prepareStatement("CALL `shield`.`link_eentity_excerpt`(?, ?);");
            pstmt.setInt(1, editorID);
            pstmt.setInt(2, missionID);

            for (EEntity e : eentList) {
                pstmt.setInt(3, e.getClassID());
                pstmt.setString(4, e.getName());

                ResultSet rs = pstmt.executeQuery();
                rs.next();

                int eentityID = rs.getInt(1);
                if (eentityID != -1) {
                    pstmt2.setInt(1, eentityID);
                    for (Excerpt excr : e.getExcrList()) {
                        pstmt2.setInt(2, excr.getId());
                        pstmt2.execute();
                    }
                }

            }

            return true;

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public ArrayList<EEntity> GetAllCCOfMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_cc_mission`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<EEntity> eentList = new ArrayList<EEntity>();
                do {
                    EEntity eent = new EEntity();
                    Area area = new Area();

                    eent.setId(rs.getInt(1));
                    eent.setClassID(rs.getInt(2));
                    eent.setClassDesc(rs.getString(3));
                    eent.setName(rs.getString(4));
                    eent.setDateFrom(rs.getDate(5));
                    eent.setDateTo(rs.getDate(6));
                    eent.setLat(rs.getDouble(7));
                    eent.setLng(rs.getDouble(8));

                    PreparedStatement pstmt2 = cn.prepareStatement("CALL shield.get_all_excerpt_eentity(?);");
                    pstmt2.setInt(1, eent.getId());
                    ResultSet rs2 = pstmt2.executeQuery();
                    rs2.next();

                    if (rs2.getRow() != 0) {
                        ArrayList<Excerpt> excrList = new ArrayList<Excerpt>();
                        do {
                            Excerpt excr = new Excerpt();
                            Area area2 = new Area();

                            excr.setId(rs2.getInt(1));
                            excr.setText(rs2.getString(2));
                            area2.setLevel8(rs2.getString(3));
                            area2.setLevel7(rs2.getString(4));
                            area2.setLevel6(rs2.getString(5));
                            area2.setLevel5(rs2.getString(6));
                            area2.setLevel4(rs2.getString(7));
                            area2.setLevel3(rs2.getString(8));
                            area2.setLevel2(rs2.getString(9));
                            area2.setLevel1(rs2.getString(10));
                            area2.setLat(rs2.getDouble(11));
                            area2.setLng(rs2.getDouble(12));

                            excr.setEentityEnabled(true);

                            excr.setArea(area2);

                            excrList.add(excr);
                        } while (rs2.next());
                        eent.setExcrList(excrList);
                    }

                    eentList.add(eent);

                } while (rs.next());

                cn.close();
                return eentList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public boolean UpdateCCOfMission(int missionID, ArrayList<EEntity> ccList) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`update_cc`(?, ?, ?, ?, ?, ?);");

            for (EEntity e : ccList) {
                pstmt.setInt(1, e.getId());
                pstmt.setDate(2, new java.sql.Date(e.getDateFrom().getTime()));
                pstmt.setDate(3, new java.sql.Date(e.getDateTo().getTime()));
                pstmt.setDouble(4, e.getLat());
                pstmt.setDouble(5, e.getLng());
                pstmt.setString(6, e.getAddress());
                pstmt.executeUpdate();
            }

            return true;

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public ArrayList<EEntity> GetAllCROfMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_cr_mission`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<EEntity> eentList = new ArrayList<EEntity>();
                do {
                    EEntity eent = new EEntity();

                    eent.setId(rs.getInt(1));
                    eent.setClassID(rs.getInt(2));
                    eent.setClassDesc(rs.getString(3));
                    eent.setName(rs.getString(4));

                    PreparedStatement pstmt2 = cn.prepareStatement("CALL shield.get_all_cv_cr_data(?);");
                    pstmt2.setInt(1, eent.getId());
                    ResultSet rs2 = pstmt2.executeQuery();
                    rs2.next();

                    if (rs2.getRow() != 0) {
                        ArrayList<EEntity> cvList = new ArrayList<EEntity>();
                        do {
                            EEntity cv = new EEntity();

                            cv.setId(rs2.getInt(1));
                            cv.setName(rs2.getString(2));
                            cv.setCrit(rs2.getInt(3));
                            cv.setAcce(rs2.getInt(4));
                            cv.setRecu(rs2.getInt(5));
                            cv.setVuln(rs2.getInt(6));
                            cv.setEffe(rs2.getInt(7));
                            cv.setReco(rs2.getInt(8));

                            cvList.add(cv);
                        } while (rs2.next());
                        eent.setCvList(cvList);
                    }

                    eentList.add(eent);

                } while (rs.next());

                cn.close();
                return eentList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public ArrayList<EEntity> GetAllCCCVCROfMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_cr_mission`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<EEntity> eentList = new ArrayList<EEntity>();
                do {
                    EEntity eent = new EEntity();

                    eent.setId(rs.getInt(1));
                    eent.setClassID(rs.getInt(2));
                    eent.setClassDesc(rs.getString(3));
                    eent.setName(rs.getString(4));

                    PsyopObjective po = new PsyopObjective();
                    po.setText(rs.getString(5));
                    eent.setPo(po);
                    eent.setPoText(po.getText());

                    // CC's of CR
                    PreparedStatement pstmt2 = cn.prepareStatement("CALL shield.get_all_cc_cr(?);");
                    pstmt2.setInt(1, eent.getId());
                    ResultSet rs2 = pstmt2.executeQuery();
                    rs2.next();

                    if (rs2.getRow() != 0) {
                        ArrayList<EEntity> ccList = new ArrayList<EEntity>();
                        do {
                            EEntity cc = new EEntity();

                            cc.setId(rs2.getInt(1));
                            cc.setName(rs2.getString(2));
                            cc.setDateFrom(rs2.getDate(3));
                            cc.setDateTo(rs2.getDate(4));
                            cc.setLat(rs2.getDouble(5));
                            cc.setLng(rs2.getDouble(6));

                            ccList.add(cc);
                        } while (rs2.next());
                        eent.setCcList(ccList);
                    }

                    // CV's of CR
                    PreparedStatement pstmt3 = cn.prepareStatement("CALL shield.get_all_cv_cr_data(?);");
                    pstmt3.setInt(1, eent.getId());
                    ResultSet rs3 = pstmt3.executeQuery();
                    rs3.next();

                    if (rs3.getRow() != 0) {
                        ArrayList<EEntity> cvList = new ArrayList<EEntity>();
                        do {
                            EEntity cv = new EEntity();

                            cv.setId(rs3.getInt(1));
                            cv.setName(rs3.getString(2));
                            cv.setCrit(rs3.getInt(3));
                            cv.setAcce(rs3.getInt(4));
                            cv.setRecu(rs3.getInt(5));
                            cv.setVuln(rs3.getInt(6));
                            cv.setEffe(rs3.getInt(7));
                            cv.setReco(rs3.getInt(8));

                            cvList.add(cv);
                        } while (rs2.next());
                        eent.setCvList(cvList);
                    }

                    // CV's of CR
                    PreparedStatement pstmt4 = cn.prepareStatement("CALL shield.get_all_spo_cr(?);");
                    pstmt3.setInt(1, eent.getId());
                    ResultSet rs4 = pstmt4.executeQuery();
                    rs3.next();

                    if (rs4.getRow() != 0) {
                        ArrayList<EEntity> cvList = new ArrayList<EEntity>();
                        do {
                            EEntity cv = new EEntity();

                            cv.setId(rs3.getInt(1));
                            cv.setName(rs3.getString(2));
                            cv.setCrit(rs3.getInt(3));
                            cv.setAcce(rs3.getInt(4));
                            cv.setRecu(rs3.getInt(5));
                            cv.setVuln(rs3.getInt(6));
                            cv.setEffe(rs3.getInt(7));
                            cv.setReco(rs3.getInt(8));

                            cvList.add(cv);
                        } while (rs2.next());
                        eent.setCvList(cvList);
                    }

                    eentList.add(eent);

                } while (rs.next());

                cn.close();
                return eentList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public ArrayList<EEntity> GetAllCCOfCR(int crID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_cc_cr`(?);");
            pstmt.setInt(1, crID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                
                ArrayList<EEntity> ccList = new ArrayList<EEntity>();
                do {
                    EEntity cc = new EEntity();

                    cc.setId(rs.getInt(1));
                    cc.setName(rs.getString(2));
                    cc.setDateFrom(rs.getDate(3));
                    cc.setDateTo(rs.getDate(4));
                    cc.setLat(rs.getDouble(5));
                    cc.setLng(rs.getDouble(6));
                    cc.setAddress(rs.getString(7));

                    ccList.add(cc);
                } while (rs.next());
                
                cn.close();
                return ccList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }
}
