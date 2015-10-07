/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
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
    public ArrayList<Source> GetAllSources() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`3865`();");
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
                    src.setTitle(rs.getString(3));
                    src.setDesc(rs.getString(4));
                    src.setPublished(rs.getDate(5));
                    src.setEncoded(rs.getDate(6));
                    
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
}
