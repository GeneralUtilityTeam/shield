/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Config;
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
public class SystemDAO {

    public ArrayList<Config> GetSourceClasses() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`sys_source_classes`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Config> confList = new ArrayList<Config>();
                do {
                    Config conf = new Config();
                    conf.setId(rs.getInt(1));
                    conf.setValueText(rs.getString(2));

                    confList.add(conf);
                } while (rs.next());

                cn.close();
                return confList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(SystemDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }
    public ArrayList<Config> GetExcerptCategories() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`sys_excerpt_categories`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Config> confList = new ArrayList<Config>();
                do {
                    Config conf = new Config();
                    conf.setId(rs.getInt(1));
                    conf.setValueText(rs.getString(2));

                    confList.add(conf);
                } while (rs.next());

                cn.close();
                return confList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(SystemDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

}
